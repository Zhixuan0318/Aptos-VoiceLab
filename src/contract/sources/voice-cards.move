module voice_lab::voice_cards {
	use std::object::{Object, ConstructorRef, Self};
	use std::string::{String, utf8};
	use std::option;
	use std::signer;
	use std::vector;

	use std::ed25519;

	use aptos_framework::event;

	use aptos_framework::account::{SignerCapability, Self};
	use aptos_framework::resource_account;

	use aptos_framework::coin;
	use aptos_framework::aptos_coin::{AptosCoin};

	use aptos_framework::primary_fungible_store;
	use aptos_framework::fungible_asset::{MintRef, BurnRef, Self};

	use aptos_token_objects::collection::{Collection, Self};
	use aptos_token_objects::token::{Token, Self};
	use aptos_token_objects::royalty::{Royalty};

	const ECardDoesNotExist: u64 = 0;
	const ECardAlreadyExists: u64 = 1;

	const EBalanceIsTooLow: u64 = 10;

	const ESendedNotFromWebsite: u64 = 20;

	struct State has key, store {
		collection_object: Object<Collection>,
		signerCap: SignerCapability,
		image_url: String
	}

	struct TokenData has key {
		creator: address,
		price: u64,
		labels: vector<String>,

		mintRef: MintRef,
		burnRef: BurnRef
	}

	#[event]
    struct CardAdded has drop, store {
		card_address: address,
        creator: address,
		name: String,
		description: String,
		price: u64,
		labels: vector<String>
    }

	fun init_module(creator: &signer) {
		let signerCap = resource_account::retrieve_resource_account_cap(creator, @owner);

		let name = utf8(b"Name");
		let description = utf8(b"Description");
		let collection_uri = utf8(b"URI");
		let image_url = utf8(b"https://rose-principal-turtle-588.mypinata.cloud/ipfs/QmfTT2zQhjJkVssL3R644EWreQXTAfR4JKVUGZkRzQqdbo");

		collection::create_unlimited_collection(creator, description, name, option::none<Royalty>(), collection_uri);

		let collection_address = collection::create_collection_address(&signer::address_of(creator), &name);
		move_to<State>(creator, State {
			collection_object: object::address_to_object<Collection>(collection_address),
			signerCap,
			image_url
		});
	}

	entry fun add_card(
		sender: &signer, 
		name: String, description: String, uri: String, 
		price: u64, labels: vector<String>, 
		signature: vector<u8>, message: vector<u8>
	) acquires State {

		assert!(is_creator(signature, message), ESendedNotFromWebsite);

		let state: &State = borrow_global<State>(@voice_lab);

		let creator: &signer = &account::create_signer_with_capability(&state.signerCap);
		let collection_name = collection::name<Collection>(*&state.collection_object);

		let constructor_ref: ConstructorRef = token::create_named_token(
			creator, 
			collection_name, 
			description, 
			name, 
			option::none<Royalty>(), 
			uri
		);

		let token_signer = object::generate_signer(&constructor_ref);

		assert!(!exists<TokenData>(signer::address_of(&token_signer)), ECardAlreadyExists);

		primary_fungible_store::create_primary_store_enabled_fungible_asset(
			&constructor_ref,
			option::none<u128>(),
			name,
			utf8(b"CARD"),
			0,
			*&state.image_url,
			utf8(b"voice-cards")
		);

		move_to<TokenData>(&token_signer, TokenData {
			creator: signer::address_of(sender),
			price,
			labels,

			mintRef: fungible_asset::generate_mint_ref(&constructor_ref),
			burnRef: fungible_asset::generate_burn_ref(&constructor_ref)
		});

		primary_fungible_store::mint(&fungible_asset::generate_mint_ref(&constructor_ref), signer::address_of(sender), 1);

		event::emit(CardAdded {
			card_address: signer::address_of(&token_signer),
			creator: signer::address_of(sender),
			name,
			description,
			price,
			labels
		});
	}

	fun is_creator(signature_bytes: vector<u8>, message: vector<u8>): bool {
		let signature = ed25519::new_signature_from_bytes(signature_bytes);
		let public_key = ed25519::new_unvalidated_public_key_from_bytes(x"9c627f5d22970154636f8e675df54d836ec6c2bcfe5c053e3241a9e562f5a4cb");

		ed25519::signature_verify_strict(&signature, &public_key, message)
	}

	entry fun buy_card(sender: &signer, token_id: address) acquires TokenData {
		assert!(exists<TokenData>(token_id), ECardDoesNotExist);

		let token_data = borrow_global<TokenData>(token_id);
		assert!(coin::balance<AptosCoin>(signer::address_of(sender)) >= *&token_data.price, EBalanceIsTooLow);

		coin::transfer<AptosCoin>(sender, *&token_data.creator, *&token_data.price);

		primary_fungible_store::mint(&token_data.mintRef, signer::address_of(sender), 1);
	}

	entry fun burn_card(sender: &signer, token_id: address, signature: vector<u8>, message: vector<u8>) acquires TokenData {
		assert!(is_creator(signature, message), ESendedNotFromWebsite);

		let token_data = borrow_global<TokenData>(token_id);

		primary_fungible_store::burn(&token_data.burnRef, signer::address_of(sender), 1);
	}

	#[view]
	public fun get_card_data(token_id: address): (address, String, String, String, u64, vector<String>) acquires TokenData {
		if(!exists<TokenData>(token_id)) {
			return (@0x0, utf8(b""), utf8(b""), utf8(b""), 0, vector::empty<String>())
		};

		let token_data = borrow_global<TokenData>(token_id);

		let token_object = object::address_to_object<Token>(token_id);

		(*&token_data.creator, token::name(token_object), token::description(token_object), token::uri(token_object), *&token_data.price, *&token_data.labels)
	}
}
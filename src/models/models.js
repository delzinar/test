import React, {Component} from 'react';
export const updatePolicyStates = {
		attribute: '',
		operator: '',
		event: '',
		version: '',
		policyId: '',
		sendInterval: '',
		checkPolicyUpdateInterval: '',
		filterId: '',
		operators: [{attribute: "", operator: "", match: []}], 
		policies: [], 
		defaultPolicy: {},
		globalPolicy: {
		 
		}
}

export const optionsEventModel = ['SMS', 'CALL', 'APP', 'WIFI', 'Location/GPS'];
export const mod = [{
	"policyId": 1,
	"event": "SMS",
	"action": 'action',	
	"filters": [{
		"filterId": 1,
		"attr": "body",	
		"operator": "contains",	
		"match": ""	
	}],
}]
export const regionOfInterestModel = {
	"policyId": 1,
	"event": "SMS",
	"action": [],	
	"attr": "",	
	"operator": "",	
	"match": ""	
};

export const optionsDropdownModel = {
		'SMS': {
			actions: ['Incoming', 'Outgoing'],
			//filterAttributes: ['sender','reciever', 'body'],
			filterAttributes: {
				'SELECT'   : ['sender','receiver', 'body'],
				'Incoming' : ['sender', 'body'],
				'Outgoing' : ['receiver', 'body']
			},
			operators: ['contains', 'starts with', 'ends with', 'equals to'],
			match: '',
			},
		'CALL': {
				actions: ['Incoming', 'Outgoing'],
				filterAttributes: {
					'SELECT': ['caller', 'receiver'],
					'Incoming': ['caller'],
					'Outgoing': ['receiver']
				},
				operators: ['contains', 'starts with', 'ends with', 'equals to'],
				match: '',
		},
		'APP': {
				actions: ['Install', 'Uninstall'],
				filterAttributes: {
					'SELECT' : ['packageName'],
					'Install' : ['packageName'],
					'Uninstall' : ['packageName']
				},
				operators: ['contains', 'starts with', 'ends with', 'equals to'],
				match: '',
		},
		
		'WIFI': {
				actions: ['Connect', 'Disconnect', 'Avaialble'],
				filterAttributes: {
					'Connect' : ['SSID', 'BSSID'],
					'Disconnect' : ['SSID', 'BSSID'],
					'Avaialble' : ['SSID', 'BSSID']
				},
				operators: ['eqals to','contains'],
				match: '',
		},
		'Location/GPS': {
				actions: ['Near'],
				filterAttributes: {
					'Near':['Lat Long']
				},
				operators: ['within'],
		},
		
}

export const policyPayload = {
		"ver": '',
		'globalPolicy': {
				"policyId": 1,
				"sendInterval": 0,
				"checkPolicyUpdateInterval": 86400
		},
		"policies": [
				{
					"policyId": 2,
					"event": "SMS",
					"action": [
						"Incoming",
						"Outgoing"
					],
					"filters": [
						{
							"filterId": 1,
							"attr": "body",
							"operator": "contains",
							"match": "hello,resturant"
						}
					]
				},
				{
					"policyId": 3,
					"event": "CALL",
					"action": [
						"Incoming",
						"Outgoing"
					],
					"filters": [
						{
							
						}
					]
				},
				{
					"policyId": 4,
					"event": "APP",
					"action": [
						"Install",
						"Uninstall"
					],
					"filters": [
						{
							
						}
					]
				},
				{
					"policyId": 5,
					"event": "WIFI",
					"filters": [
						{
							"filterId": 1,
							"attr": "SSID",
							"operator": "contains",
							"match": "reliance, coffee"
						}
					]
				},
				{
					"policyId": 6,
					"event": "Location/GPS",
					"filters": [
						{
							"filterId": 1,
							"attr": "Loc",
							"operator": "within",
							"match": "500 m"
						}
					]
				}
			
		],
}
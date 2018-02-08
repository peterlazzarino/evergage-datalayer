import * as React from "react";
import * as PropTypes from "prop-types";
import * as indexOf from "array-index-of";

declare var Evergage: any;

const canUseDOM = typeof window !== "undefined";
const evergageReady = typeof Evergage !== "undefined";

let currentCampaigns = [];
let campaignListeners = [];

(()=> {
    if(!canUseDOM || !evergageReady){
        return false;
    }
    Evergage.addCampaignResponseListener((x) => pushUpdates(x.campaignResponses));
})();

export const subscribeToCampaign = (callback, campaignName) => {
    const currentListener = campaignListeners[campaignName];
    const currentCampaign = currentCampaigns[campaignName];
    if(!currentListener){
        campaignListeners[campaignName] = [];
    }
    if(currentCampaign){
        callback(currentCampaign);
    }
    campaignListeners[campaignName].push(callback)
}

const pushUpdates = (responses) => {
    responses.forEach(campaign => {
        const listeners = campaignListeners[campaign.campaignName];
        const hasListeners = Array.isArray(listeners) && listeners.length > 0;
        storeCampaign(campaign);
        if(!hasListeners){
            return;
        }
        campaignListeners[campaign.campaignName].forEach(cb => {
            cb(campaign);
        });
    });
}

const storeCampaign = (evergageCampaign) => {    
    if(!currentCampaigns[evergageCampaign.campaignName]){
        currentCampaigns[evergageCampaign.campaignName] = [];
    }
    currentCampaigns[evergageCampaign.campaignName] = evergageCampaign;
}
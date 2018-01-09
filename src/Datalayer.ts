import * as React from "react";
import * as PropTypes from "prop-types";
import * as indexOf from "array-index-of";

declare var Evergage: any;

const canUseDOM = typeof window !== "undefined";

let currentCampaigns = [];
let campaignListeners = [];

(()=> {
    if(!canUseDOM){
        return false;
    }
    Evergage.addCampaignResponseListener((x) => pushUpdates(x.campaignResponses));
})();

export const subscribeToCampaign = (callback, campaignName) => {
    if(!campaignListeners[campaignName]){
        campaignListeners[campaignName] = [];
    }
    campaignListeners[campaignName].push(callback)
}

const pushUpdates = (responses) => {
    responses.forEach(campaign => {
        const listeners = campaignListeners[campaign.campaignName];
        const hasListeners = Array.isArray(listeners) && listeners.length > 0;
        if(!hasListeners){
            return;
        }
        campaignListeners[campaign.campaignName].forEach(cb => {
            cb(campaign);
        });
    });
}

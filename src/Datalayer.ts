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
    campaignListeners[campaignName].push(callback)
}

export const pushUpdates = (responses) => {
    responses.forEach(campaign => {
        campaignListeners[campaign.campaignName].forEach(cb => {
            cb(campaign);
        });
    });
}

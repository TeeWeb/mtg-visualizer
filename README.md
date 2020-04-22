# MTG-Visualizer

## Overview

A web app that displays relationships between cards from Magic: The Gathering based on it's game mechanics.

Users can enter search criteria (including colors, keywords, type, and sets) which is used to filter card data (provided by magicthegathering.io's API) and then display related cards. Search results are displayed in a 3D space with each card represented as an "orb", floating in a position determined by it's Color Identity (as defined in api.maginthegathering.io) and Converted Mana Cost as shown below.

![card seach results](./src/img/MTG-synergy-guide-screenshot2.png "Search Results without a selected card")

When a card is selected by the user, the displayed "orbs" are filtered based upon their "synergy" with the selected card, leaving only "synergistic" cards.

![cards with synergy](./src/img/MTG-synergy-guide-screenshot.png "Search results filtered based on synergy with the selected card")

The app is built in React and uses ThreeJS to display a 3D data field in which the user can navigate through and examine the card results. The "cards" are first rendered as orbs located at various points throughout the 3D scene, which are positioned according to their relationship with each the other "cards". This gives the user a visual reference for the amount of "synergy" between cards.

## Future Improvements

### Decklist Import

In the future, could add a Decklist Import feature to allow users to upload decklists and have a visual reference for the relationships between the cards in their decks. This feature could also include a graph displaying the deck's Mana Curve and other deck information.

## Setup

After cloning repo and running `npm install`, run the app in development mode: `npm run dev`

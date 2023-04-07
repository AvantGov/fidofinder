# fidofinder

## What is it? 
fidofinder is an application that allows users to view filtered lists of dogs, select their favorites, and the generate a match based on their selections. 

## running locally 
1. clone the main branch of this repository to a location on your machine. 
2. navigate to the client directory and install dependencies 
```
cd client/
yarn install
```
3. while still in the client directory, issue a run/start command 
```
yarn start
```
4. application will open in default browser selection

## workflow + UX 
When the user first opens the application they will be met with default search results. This is 25 results, with no breed or age filtering applied. The list is scrollable. With each result displayed, there is the option to favorite the result. Tapping the button again will prompt the user with a dialog that confirms they wish to remove the dog from their favorites selection. When a dog is added to the favorites list, their result in that search (and other searches**) will be given a yellow border to signified they are a part of the favorites list. 

The user can navigate to the filtered search page to perform a new search with filtered results. if no filter params are changed, a default search (identical to the initial page load after login) will be performed and presented to the user. 

The user can navigate to the My Account page to see details about their logged in session. If the user has at least 1 favorite, they will be given the option to view their favorites list. If the user has 5 or more favorites, they will be presented the option to generate a match. Until these criteria are met, these options will not be rendered on the page. 

Viewing favorites will present the user with a list of their chosen favorites. Selecting the "Sort" button on the top left of the screen will re-odered the list in Ascending or Descending order. Dogs are presented in the order of which they were added to the list (chronological). 

Generating a match will present the user with a single result based on thier selected favorites at that time. 

At any time, the user is able to select the Nav Logo (fidofinder) and return to the /browse page. This will return a default search. 

Additionally, at any time the user may select the red Logout button at the top right of the screen to end the current session. This will clear out any data about the session and clears the favorites list as well. 

## Architecture 
```
App 
    Nav
    Login
    
    /browse (after login)
    LogoutButton
    SortButton
    Browse

    /account (after login)
    LogoutButton
    SortButton
    Account
        Favorites
        Match
    
    /filter
    LogoutButton
    Filter

    /* (404)
    (simple <p> rendered notifying a 404 error)
```


### Know Issues: 
- account information does not persist through page reload. 

- **Currently, when a user loads /browse without filteredSearch params in the GET; then adds some favorites, navigates away from /browse (or runs a new filtered search), favorites indicators placed on dog cards (golden ring + html change) will not appear until a new favorite is added. this is dues to redux reading of stale state on the component level. When an update to the favorites is detected, the component can update and render these style udpates.



# Color Theme
------------------
#AD87A6
#6296A4
#73757F
#1E2329
#FFFFFF
#D86C64
#dadada

### UI Colors: 
Success: #008800
Error: #f20000
Warning: #E1AE5B


# Appendix 

### Futured Plans: 
- in the case of pages where lists are paginated after and axios call, creation of the list and children elements are written in line. It would be possible to create utility files that serve the purpose of these inline methods. While developing I found that useRefs were not high enough of a priority to cause re-render (could not control logic in JSX return) and useState controllers were TOO high, and caused endless re-render loops that failed out. Writing these methods in line proved to be the most stable option for this use case, at the expense of readibility + modularity. (sorry) 


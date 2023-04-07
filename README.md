# fidofinder



### Know Issues: 
- account information does not persist through page reload. 
- Currently, when a user loads /browse without filteredSearch params in the GET; then adds some favorites, navigates away from /browse (or runs a new filtered search), favorites indicators placed on dog cards (golden ring + html change) will not appear until a new favorite is added. this is dues to redux reading of stale state on the component level. When an update to the favorites is detected, the component can update and render these style udpates.



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

### Leinancies Taken 
- in the case of pages where lists are paginated after and axios call, creation of the list and children elements are written in line. It would be possible to create utility files that serve the purpose of these inline methods. While developing I found that useRefs were not high enough of a priority to cause re-render (could not control logic in JSX return) and useState controllers were TOO high, and caused endless re-render loops that failed out. Writing these methods in line proved to be the most stable option for this use case, at the expense of readibility + modularity. (sorry) 


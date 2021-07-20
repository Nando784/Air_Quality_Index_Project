# Air_Quality_Index_Project
>A Web Application for monitoring Air Pollution and the particles it contains.<br>
>Based on World Air Quality Index Project API's (aqicn.org/api/).

# Link
- **Air Quality Index** [**Air-Quality-Index-Project.Herokuapp.com**](https://air-quality-index-project.herokuapp.com/src/dist/html/home.html)
- **API's** [**World Air Quality Index Project**](aqicn.org/api/)

## Dependencies

- Browser's latest version for the compatibility of the CSS and HTML Tags.
- Bootstrap v5.0.1
- Jquery v3.6.0
- Lodash v4.17.21
- Popper.js v1.16.1

## Dev-Dependencies

- Axios v0.21.1
- Css-Loader v5.2.6
- Sass v1.34.1
- Sass-Loader v12.0.0
- Style-Loader v2.0.0
- Html-Webpack-Plugin v5.3.1
- Webpack v5.39.1
- Webpack-Cli v4.7.2

## Structure
- The PHP page (Index.php) contains the reference to the Index.html page, <br>which in turn redirects to the Home.html page in "dist/html".<br>
- Each page has its own bundle which refers to an entry in the "assets/js/entry" folder.
- Each page has its own SCSS file, which is compiled and inserted into the final Bundle.<br>
    Each SCSS file is implemented through the use of the Main.scss file.

## Files & Directory

1. **Root**
    - *.gitattributes*
    - *.gitignore*
    - *License.txt*
    - *Readme.md*
    - *composer.json*
    - *Index.html*
    - *Index.php*
    - *package-lock.json*
    - *package.json*
    - *webpack.config.js*
    - **SRC**
        - **Assets**
             - **font**
               - *sans-pro-bold.ttf*
               - *sans-pro-regular.ttf*
             - **img**
                - ***icon***
                     - *0-No_Data.svg*
                     - *1-Good.svg*
                     - *2-Moderate.svg*
                     - *3-Unhealthy_For_Sensitive.svg*
                     - *4-Unhealthy-White.svg* 
                     - *5-Very_Unhealthy-White.svg*
                     - *6-Hazardous-White.svg*
                     - *Air_Quality.svg*
                     - *Navigation.svg*
                     - *Search.svg*
                     - *Map.svg*
                        
                - *NO2.png*
                - *O3.png*
                - *PM10.png*
                - *PM2_5.png*
                - *page_icon.png*
             - **js**
                - **entry**
                    - *details_entry.js*
                    - *home_entry.js*
                    - *map_entry.js*
                    - *search_entry.js*
                - *Card.js*
                - *library.js*
                - *request.js*
             - **sass**
                - **other**
                    - *_animation.scss*
                    - *_card.scss*
                    - *_fonts.scss*
                    - *_footer.scss*
                    - *_palette.scss*
                    - *_scrollbar.scss*
                    - *_separator.scss*
                - *_home.scss*
                - *_map.scss*
                - *_search.scss*
                - *main.scss*
             - **template**
                - *details.html*
                - *home.html*
                - *map.html*
                - *search.html*
        - **DIST**
            - *details.bundle.js*
            - *home.bundle.js*
            - *map.bundle.js*
            - *search.bundle.js*
            - **font**<br>
              - *sans-pro-bold.ttf*
              - *sans-pro-regular.ttf*
            - **html**
               - *details.html*
               - *home.html*
               - *map.html*
               - *search.html*
            - **img**
               - *0-No_Data.svg*
               - *1-Good.svg*
               - *2-Moderate.svg*
               - *3-Unhealthy_For_Sensitive.svg*
               - *4-Unhealthy-White.svg* 
               - *5-Very_Unhealthy-White.svg*
               - *6-Hazardous-White.svg*
               - *Air_Quality.svg*
               - *Navigation.svg*
               - *Search.svg*
               - *Map.svg*
               - *NO2.png*
               - *O3.png*
               - *PM10.png*
               - *PM2_5.png*
               - *page_icon.png*
           

## Release History

* 0.0.1
    * Creation of the Repository and Upload of all files related to the page.
    
* 0.0.2
    * Update .gitignore File
    
* 0.0.3
    * Add Map Page
    
* 0.0.4
    * Heroku Update (Added Json and Php file for compatibility)
    
* 0.0.5
    * Update Readme File

* 0.0.6
    * Add Details Page    

* 0.0.7
    * Changed Some Aspects of the Details Page and Added the Aqi Widget for a Single City

* 1.0.0
    * Final Build. Replaced the Aqicn widget with a custom interface. The detail page works correctly. Added "Back" button in the search and details screen.

* 1.0.1
    * Fix some Bugs

* 1.0.2
    * Some Style Change

* 1.0.3
    * Update Readme File
    
* 1.1.0
    * Update bug relative to map creation 


## Meta

Nando Sorbello – nandosorbello@live.it<br>
[LinkedIn](https://www.linkedin.com/in/nando-sorbello-290399/) - [GitHub](https://github.com/Nando784) 

Distributed under the MIT License. See ``LICENSE`` for more information.



## Contributing

1. Fork it 
2. Create your feature branch
3. Commit your changes 
4. Push to the branch 
5. Create a new Pull Request
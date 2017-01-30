/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('itens all have url defined and not empty', function() {
            allFeeds.forEach(function(feed){
                expect(feed.url).toBeDefined(); // checks if the url is defined
                expect(feed.url.length).toBeGreaterThan(0); // checks if the url is not empty
            });
        });

        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('itens all have name defined and not empty', function() {
            allFeeds.forEach(function(feed){
                expect(feed.name).toBeDefined(); // checks if the name is defined
                expect(feed.name.length).toBeGreaterThan(0); // checks if the name is not empty
            });
        });
    });


    /* Write a new test suite named "The menu" */
    describe('The menu', function() {
        var menu = document.getElementsByClassName('menu-icon-link')[0];
        var body_classes;

        /* Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('menu is hidden by default', function() {
            body_classes = document.body.className;
            expect(body_classes).toContain('menu-hidden');
        });

         /* Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('menu changes visibility when clicked', function() {
            menu.click(); // Opens the menu
            body_classes = document.body.className;
            expect(body_classes).not.toContain('menu-hidden');

            menu.click(); // Closes the menu
            body_classes = document.body.className;
            expect(body_classes).toContain('menu-hidden');
        });
    });

    /* Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        // Using "done" to deal with asynchronous calls
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        /* Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        it('there is at least one .entry element', function() {
            expect($('.feed .entry').length).not.toBe(0);
        });
     });


    /* Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        /* Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        var initialFeed, changedFeed;

        // Using "done" to deal with asynchronous calls
        beforeEach(function(done) {
            // Loads the first feed and when finishes(callback), loads the second feed
            loadFeed(0, function() {
                initialFeed = document.getElementsByClassName('feed')[0].innerHTML;

                loadFeed(1, function() {
                    changedFeed = document.getElementsByClassName('feed')[0].innerHTML;
                    done();
                });
            });
        });

        it('the content changes when a new feed is loaded', function() {
            expect(changedFeed).not.toEqual(initialFeed); // Compares the html of the feeds
        });
    });

}());

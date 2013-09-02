// jQuery shorthand for calling $(document).ready() and associating '$' as a reference to the jQuery library only.
jQuery(function ($) {
    // Global meters on main screen.
    var defaultProgress = 50;
    var mainMoney = defaultProgress;
    var mainHappiness = defaultProgress;
    var mainEfficiency = defaultProgress;

    // Toggle these for development.
    var startPageId = '#intro-page';
    //setMainProgressBars(mainMoney, mainHappiness, mainEfficiency); // Turn off if starting with the intro pages.
    var timeScale = 60;
    //var timeScale = 30 * 24 * 60; // Arbitrary default.
    var currentBuilding = 1;    // Current level (1-7)

    // This stuff runs at startup.
    var screens = new Screens();
    var activeProjects = new ActiveProjects();
    var randomEvents = new RandomEvents();
    var clipboard = new Clipboard();
    var billSlider = new Slider('#bill-slider');
    var rentSlider = new Slider('#rent-slider');
    var completeSlider = new Slider('#project-complete-slider');
    initTransitions();
    initButtons();
    fixAnchorTags('a'); // Must run after all <a> tags are created.

    /** START Storage **/
    function saveState() {
        localStorage['money'] = mainMoney;
        localStorage['happiness'] = mainHappiness;
        localStorage['efficiency'] = mainEfficiency;
    }

    function loadState() {
        mainMoney = getItem('money', defaultProgress);
        mainHappiness = getItem('happiness', defaultProgress);
        mainEfficiency = getItem('efficiency', defaultProgress);
        
        setMainProgressBars(mainMoney, mainHappiness, mainEfficiency);
    }

    function getItem(name, defaultValue) {
        var item = localStorage[name];
        if (item === 'undefined' || item === undefined) {
            item = defaultValue;
        }
        return item;
    }
    /** END Storage **/


    /** START Active Projects **/
    // The active projects are on the same periodic interval.
    function ActiveProjects() {
        // Make a reference for the 'this' keyword.
        var self = this;

        // The current periodic interval's ID, for killing it later.
        this.id = null;

        // The project to complete if completing a project.
        this.$projectToComplete = null; // DOM element.
        this.projectToComplete = null; // JSON object.

        this.updateTimers = function () {
            // Update remaining time for each active project.
            $('.timer').each(function () {
                // Determine how much time is remaining.
                var $timer = $(this);
                var remaining = parseInt($timer.attr('data-timer'));
                remaining = (remaining > 0 ? remaining - 1 : 0);

                // Update the timer with the remaining amount.
                $timer.attr('data-timer', remaining).text(formatTime(remaining));

                // Make the project appear clickable.
                if (remaining === 0) {
                    $timer.closest('li').addClass('cursor-pointer');
                }
            });
        };

        this.restartInterval = function () {
            // Kill the old periodic interval if it exists.
            if (self.id !== null) {
                clearInterval(self.id);
            }

            // Start the new periodic interval.
            self.id = setInterval(function () {
                self.updateTimers();
            }, 1000);
        };

        this.startProject = function (project) {
            // Create a new active project.
            var activeNumber = $('#active-projects li').length + 1;
            var $activeProject = $('<li><span class="number">' + activeNumber + '</span><span class="action-title">' + project.name + '</span><span class="timer" data-timer="' + project.time_base * timeScale + '"></span></li>');

            // Add it to the list of active projects.
            $('#active-projects ul').append($activeProject);

            // Apply cost of project to main money bar
            addToMainProgressBars(project.money_base, '0', '0');

            // Add a handler to remove the project on tap if there's no time remaining.
            $activeProject.tap(function () {
                var remaining = parseInt($activeProject.find('.timer').attr('data-timer'));
                if (remaining === 0) {
                    // Set the project to complete.
                    self.$projectToComplete = $activeProject;
                    self.projectToComplete = project;

                    // Populate the project complete page with details.
                    completeSlider.setCompleteSlide(self.projectToComplete);

                    // Transition the screen.
                    showProjectCompletePage();
                }
            });

            // Restart the periodic interval to include this new active project.
            self.restartInterval();
        };

        this.completeProject = function () {
            // Remove the DOM element from the list of active projects.
            self.$projectToComplete.remove();

            // Update each project's number.
            $('#active-projects li').each(function (index) {
                $(this).find('.number').text(index + 1);
            });

            // Get the project to complete and update the main progress bars.
            var project = self.projectToComplete;
            addToMainProgressBars('0', project.happiness_base, project.efficiency_base);
        };
    }
    /** END Active Projects **/


    /** START Data Formatting **/
    // Format the times for the clipboard and project timers.
    function formatTime(value) {
        var days = Math.floor(value / 86400),
        hours = Math.floor((value - days * 86400) / 3600),
        minutes = Math.floor((value - days * 86400 - hours * 3600) / 60),
        seconds = value - days * 86400 - hours * 3600 - minutes * 60,
        result = '';
        if (value > 0) {
            if (days > 0) {
                result += days + 'd ';
            }
            if (hours > 0) {
                result += hours + 'h ';
            }
            if (minutes > 0) {
                result += minutes + 'm';
            }
            if (seconds > 0) {
                result += seconds + 's';
            }
        }
        else {
            result = 'Done!';
        }
        return $.trim(result);
    }

    function formatMoney(money) {
        return money < 0 ? '-$' + Math.abs(money) : '$' + money;
    }

    function formatHappiness(happiness) {
        return happiness + '%';
    }

    function formatEfficiency(efficiency) {
        return efficiency + '%';
    }
    /** END Data Formatting **/


    /** START Progress Bars **/
    // Resets progress bars upon starting a new game
    function resetMainProgressBars() {
        setMainProgressBars(defaultProgress, defaultProgress, defaultProgress);
    }

    // update progress bars to the specified inputs
    function addToMainProgressBars(money, happiness, efficiency) {
        var newMoney = parseInt(mainMoney, 10) + parseInt(money, 10);
        var newHappiness = parseInt(mainHappiness, 10) + parseInt(happiness, 10);
        var newEfficiency = parseInt(mainEfficiency, 10) + parseInt(efficiency, 10);

        setMainProgressBars(newMoney, newHappiness, newEfficiency);
    }

    // Set the values of the main progress bars, updates the progress bar labels, animates the progress bars, and checks for the end condition.
    function setMainProgressBars(money, happiness, efficiency) {
        // Update the global values.
        mainMoney = money;
        mainHappiness = happiness;
        mainEfficiency = efficiency;

        // Save the state.
        saveState();

        // Set the limits for the progress bars.
        var minProgress = 0;
        var maxProgress = 100;

        // Set the progress bar label text.
        $('#main .money .progress-label').text(formatMoney(mainMoney));
        $('#main .happiness .progress-label').text(formatHappiness(mainHappiness));
        $('#main .efficiency .progress-label').text(formatEfficiency(mainEfficiency));

        // changes money label to red if at or below zero
        // in case the player ever gets out of debt, change color back to default by removing the inline style
        var moneyLabelColor = mainMoney <= minProgress ? '#F00' : '';
        $('#main .money').find('.progress-label').css('color', moneyLabelColor);

        // Animate the 3 bars, using the max/min values if they're exceeded.
        $('#main .money .progress-bar').transition({
            width: getWidthPercentage(mainMoney, minProgress, maxProgress)
        }, 'slow');
        $('#main .happiness .progress-bar').transition({
            width: getWidthPercentage(mainHappiness, minProgress, maxProgress)
        }, 'slow');
        $('#main .efficiency .progress-bar').transition({
            width: getWidthPercentage(mainEfficiency, minProgress, maxProgress)
        }, 'slow');

        // Check the win/lose conditions.
        if (mainMoney <= minProgress) {
            showGameOverPage();
        }
        else if (mainMoney >= maxProgress && mainHappiness >= maxProgress && mainEfficiency >= maxProgress) {
            if (currentBuilding < 7) {
                currentBuilding++;
                showCongratsPage();
                $("#game-image").attr("src", "img/buildings/" + buildings[currentBuilding].picture);
            } else {
                showGameWonPage();
            }
        }
    }

    // Gets the CSS percentage value for performing a transition animation.
    function getWidthPercentage(value, minValue, maxValue) {
        if (value < minValue) {
            value = minValue;
        }
        else if (value > maxValue) {
            value = maxValue;
        }

        return value + '%';
    }

    // Animates progress bars on the given screen. Not for the main progress bars.
    function animateProgress(id) {
        // Set the limits for the progress bars.
        var minProgress = -100;
        var maxProgress = 100;

        $(id + ' .progress-bar').each(function () {
            // Make jQuery references.
            var $this = $(this);
            var $parent = $this.parent('div');

            // Reset from the previous time this screen was shown.
            $parent.removeClass('positive negative');
            $this.css({ 'left': '', 'width': '' });

            // Get the progress value and its corresponding value for animation.
            var progress = $parent.attr('data-bar');
            var widthPercentage = getWidthPercentage(progress, minProgress, maxProgress);

            // Positive progress.
            if (progress > 0) {
                // Set the properties of the label.
                $parent.addClass('positive');

                // Animate the bar.
                $this.transition({
                    width: widthPercentage
                }, 'slow');
            }
            // Negative progress.
            else if (progress < 0) {
                // Set the properties of the label.
                $parent.addClass('negative');

                // Animate the bar.
                $this.transition({
                    left: widthPercentage,
                    width: widthPercentage.substr(1) // remove the negative sign
                }, 'slow');
            }
            // Neutral progress doesn't show any bar.
        });
    }
    /** END Progress Bars **/


    /** START Populating Pages **/
    function populateClipboard() {
        $.each(projects, function (key) {
            var time = this.time_base * timeScale;
            var project = '<tbody><tr><td rowspan="2" class="title"><a href="#project-details" data-id="' + key + '">' + this.name + '</a><br/><span class="happiness">' + formatHappiness(this.happiness_base) + '</span><span class="efficiency">' + formatEfficiency(this.efficiency_base) + '</span></td><td class="price">' + formatMoney(this.money_base) + '</td></tr><tr><td class="time" data-time="' + time + '">' + formatTime(time) + '</td></tr></tbody>';
            $('#project-list-container .table-data').append(project);
        });
    }

    function populateDetails(id, data) {
        // Set the name.
        $(id).find('.name').text(data.name).end()

        // Set time required.
        .find('.time').text(formatTime(data.time_base * timeScale)).end()

        // Set the description.
       .find('.description').text(data.description).end()

        // Set progress bar labels.
        .find('.money .progress-label').text(formatMoney(data.money_base)).end()
        .find('.happiness .progress-label').text(formatHappiness(data.happiness_base)).end()
        .find('.efficiency .progress-label').text(formatEfficiency(data.efficiency_base)).end()

        // Set progress bar animation values.
        .find('.money').attr('data-bar', data.money_base).end()
        .find('.happiness').attr('data-bar', data.happiness_base).end()
        .find('.efficiency').attr('data-bar', data.efficiency_base).end();

        // Animate the bars.
        animateProgress(id);
    }
    /** END Populating Pages **/


    /** START Events **/
    function RandomEvents() {
        // Make a reference for the 'this' keyword.
        var self = this;

        // The event to complete when dismissing the event.
        this.eventToComplete = null;

        this.startEvent = function () {
            // Get a random event.
            var id = getRandomInt(1, 11); // TODO remove hardcoded values
            var event = events[id];

            // Set the event to complete.
            self.eventToComplete = event;

            // Populate the details page with the event and show it.
            populateDetails('#event-details', event);
            showEventPage();
        };

        this.completeEvent = function () {
            // Get the event to complete and update the main progress bars.
            var event = self.eventToComplete;
            addToMainProgressBars(event.money_base, event.happiness_base, event.efficiency_base);
        };
    }

    // https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Math/random
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    /** END Events **/


    /** START Clipboard **/
    function Clipboard() {
        // Make a reference for the 'this' keyword.
        var self = this;

        // The selected project to start if starting a project.
        this.selectedProject = null;

        this.init = function () {
            // Populate the clipboard table with data.
            // Needs to happen before the tap handlers are binded.
            populateClipboard();

            // Fills in the project details window when a project is selected.
            $('a[href="#project-details"]').tap(function () {
                // Transition the screen.
                screens.moveToFront('#project-details', 'fade', 'slow');

                // Get the selected project and set it in case it gets started.
                var projectId = parseInt($(this).attr('data-id'));
                self.selectedProject = projects[projectId];

                // Populate the page with the project's data.
                populateDetails('#project-details', self.selectedProject);
            });
        };

        this.init(); // Like a constructor.
    }
    /** END Clipboard **/


    /** START Clipboard Slider **/
    function Slider(id) {
        // Make a reference for the 'this' keyword.
        var self = this;

        // Size is currently hardcoded into the CSS as well.
        this.slideWidth = 240;

        // Unique properties for each slider.
        this.$container = $(id + ' .slide-container');
        this.$next = $(id + ' .next');
        this.$prev = $(id + ' .prev');
        this.slideCount = 0;
        this.slideIndex = 0;

        this.init = function () {
            // Init the next/prev button handlers.
            self.$next.tap(function () {
                self.nextSlide();
            });
            self.$prev.tap(function () {
                self.prevSlide();
            });

            // Init the swipe handlers.
            $(id + ' .slider').on({
                'swipeleft': function () {
                    self.nextSlide();
                },
                'swiperight': function () {
                    self.prevSlide();
                }
            });
        };

        this.updateWidth = function () {
            // Set the width of the sliding container to fit all of the slides.
            var totalWidth = self.slideWidth * self.slideCount;
            self.$container.css({ 'width': totalWidth });
        };

        this.nextSlide = function () {
            // Prevent sliding after the end.
            if (self.slideIndex < self.slideCount - 1) {
                // Slide left.
                self.$container.transition({
                    left: '-=' + self.slideWidth
                });

                // Update the index position.
                self.slideIndex++;

                // Update the next/prev buttons.
                self.showHideButtons();
            }
        };

        this.prevSlide = function () {
            // Prevent sliding before the beginning.
            if (self.slideIndex > 0) {
                // Slide right.
                self.$container.transition({
                    left: '+=' + self.slideWidth
                });

                // Update the index position.
                self.slideIndex--;

                // Update the next/prev buttons.
                self.showHideButtons();
            }
        };

        this.showHideButtons = function () {
            // See if the previous slide button should be hidden/shown.
            if (self.slideIndex === 0) {
                self.$prev.hide();
            }
            else {
                self.$prev.show();
            }

            // See if the next slide button should be hidden/shown.
            if (self.slideIndex === self.slideCount - 1) {
                self.$next.hide();
            }
            else {
                self.$next.show();
            }
        };

        this.addMoneySlide = function (rows) {
            // Create new DOM elements.
            var slide = $('<div class="slide"></div>');
            var moneyList = $('<dl class="money-list"></dl>');
            var totalCost = $('<dl class="money-list total-cost"></dl>');

            // Place the key-value pairs in the DOM elements.
            $.each(rows, function (index, kvp) {
                // Append on a different element if it's the last object in the array.
                var element;
                if (index === rows.length - 1) {
                    element = totalCost;
                }
                else {
                    element = moneyList;
                }

                // Construct the row.
                $.each(kvp, function (key, value) {
                    element.append('<dt>' + key + '</dt>');
                    element.append('<dd class="price">' + value + '</dd><dd class="dots">&nbsp;</dd>');
                });
            });

            // Append it all together.
            slide.append(moneyList);
            slide.append(totalCost);
            self.$container.append(slide);

            // Update the slider count, width, and next/prev buttons.
            self.slideCount++;
            self.updateWidth();
            self.showHideButtons();
        };

        this.setCompleteSlide = function (projectToComplete) {
            // Populate the single slide with details.
            populateDetails('#project-complete-slider', projectToComplete);

            // Set the slider count, width, and next/prev buttons.
            self.slideCount = 1;
            self.updateWidth(); // Set the initial width using the hardcoded slides.
            self.showHideButtons(); // Update the next/prev buttons (don't show the prev button on init for the first slide).
        };

        this.init(); // Like a constructor.
    }

    // Dummy data.
    billSlider.addMoneySlide([{ 'Energy Costs': '$180' }, { '# of months': 'x4' }, { 'Late Fee': '$90' }, { 'Total': '$810'}]);
    billSlider.addMoneySlide([{ 'Water Costs': '$80' }, { '# of months': 'x3' }, { 'Late Fee': '$20' }, { 'Total': '$260'}]);
    billSlider.addMoneySlide([{ 'Utilities Costs': '$140' }, { '# of months': 'x4' }, { 'Late Fee': '$50' }, { 'Total': '$610'}]);
    rentSlider.addMoneySlide([{ 'Rent': '$800' }, { '# of months': 'x2' }, { 'Late Fee': '$90' }, { 'Total': '$1690'}]);
    rentSlider.addMoneySlide([{ 'Rent': '$800' }, { '# of months': 'x2' }, { 'Late Fee': '$90' }, { 'Total': '$1690'}]);
    /** END Clipboard Slider **/


    /** START Transition System **/
    function initTransitions() {
        // Used in the slide animations as starting/stopping points, hardcoded into the CSS as well.
        var screenHeight = 480;

        /** START Core Transitions **/
        $.fn.CSS3FadeIn = function (duration, complete) {
            this.css({ 'opacity': 0 }).show().transition({
                opacity: 1,
                duration: duration,
                complete: function () {
                    this.css({ 'opacity': '' });
                    if (complete !== undefined) {
                        complete();
                    }
                }
            });

            // Maintain chainability.
            return this;
        };

        $.fn.CSS3FadeOut = function (duration, complete) {
            this.transition({
                opacity: 0,
                duration: duration,
                complete: function () {
                    this.hide().css({ 'opacity': '' });
                    if (complete !== undefined) {
                        complete();
                    }
                }
            });

            // Maintain chainability.
            return this;
        };

        $.fn.CSS3SlideDownHide = function (duration, complete) {
            this.transition({
                y: screenHeight,
                duration: duration,
                complete: function () {
                    this.hide().css({ 'transform': '' });
                    if (complete !== undefined) {
                        complete();
                    }
                }
            });

            // Maintain chainability.
            return this;
        };

        $.fn.CSS3SlideUpHide = function (duration, complete) {
            this.transition({
                y: -screenHeight,
                duration: duration,
                complete: function () {
                    this.hide().css({ 'transform': '' });
                    if (complete !== undefined) {
                        complete();
                    }
                }
            });

            // Maintain chainability.
            return this;
        };

        $.fn.CSS3SlideDownShow = function (duration, complete) {
            this.css({ 'y': -screenHeight }).show().transition({
                y: 0,
                duration: duration,
                complete: function () {
                    this.css({ 'transform': '' });
                    if (complete !== undefined) {
                        complete();
                    }
                }
            });

            // Maintain chainability.
            return this;
        };

        $.fn.CSS3SlideUpShow = function (duration, complete) {
            this.css({ 'y': screenHeight }).show().transition({
                y: 0,
                duration: duration,
                complete: function () {
                    this.css({ 'transform': '' });
                    if (complete !== undefined) {
                        complete();
                    }
                }
            });

            // Maintain chainability.
            return this;
        };
        /** END Core Transitions **/

        /** START Convenience Shortcuts **/
        $.fn.CSS3Fade = function (visibility, duration, complete) {
            if (visibility === 'show') {
                this.CSS3FadeIn(duration, complete);
            }
            else if (visibility === 'hide') {
                this.CSS3FadeOut(duration, complete);
            }

            // Maintain chainability.
            return this;
        };

        $.fn.CSS3SlideUp = function (visibility, duration, complete) {
            if (visibility === 'show') {
                this.CSS3SlideUpShow(duration, complete);
            }
            else if (visibility === 'hide') {
                this.CSS3SlideUpHide(duration, complete);
            }

            // Maintain chainability.
            return this;
        };

        $.fn.CSS3SlideDown = function (visibility, duration, complete) {
            if (visibility === 'show') {
                this.CSS3SlideDownShow(duration, complete);
            }
            else if (visibility === 'hide') {
                this.CSS3SlideDownHide(duration, complete);
            }

            // Maintain chainability.
            return this;
        };

        $.fn.CSS3Transition = function (visibility, animation, duration, complete) {
            if (animation === 'fade') {
                this.CSS3Fade(visibility, duration, complete);
            }
            else if (animation === 'slideup') {
                this.CSS3SlideUp(visibility, duration, complete);
            }
            else if (animation === 'slidedown') {
                this.CSS3SlideDown(visibility, duration, complete);
            }

            // Maintain chainability.
            return this;
        };
        /** END Convenience Shortcuts **/
    }

    function Screens() {
        // Make a reference for the 'this' keyword.
        var self = this;

        // The starting z-index.
        this.zIndex = 1; // z-indices will grow infinitely.

        this.init = function () {
            $(startPageId).show();
        };

        this.slideFromTo = function (fromId, toId, duration) {
            $(fromId).CSS3SlideDownHide(duration, function () {
                $(toId).CSS3SlideUpShow(duration);
            });
        };

        this.moveToFront = function (id, animation, duration, complete) {
            $(id).css({ 'z-index': self.zIndex++ }).CSS3Transition('show', animation, duration, complete);
        };

        this.moveFromFront = function (id, animation, duration, complete) {
            $(id).CSS3Transition('hide', animation, duration, function () {
                $(id).css({ 'z-index': '' });
                if (complete !== undefined) {
                    complete();
                    complete = undefined; // Don't fire the complete on each item, only once. Normally jQuery doesn't do this, but the jquery.transit library does.
                }
            });
        };

        this.init(); // Like a constructor.
    }
    /** END Transition System **/


    /** START Buttons **/
    function initButtons() {
        /** START Intro Buttons **/
        $('#go-to-new-game').tap(function () {
            screens.slideFromTo('#intro-page', '#new-game-page');
        });

        $('#go-to-signin').tap(function () {
            screens.slideFromTo('#intro-page', '#signin-page');
        });

        $('#switch-to-new-game').tap(function () {
            screens.slideFromTo('#signin-page', '#new-game-page');
        });

        $('#switch-to-signin').tap(function () {
            screens.slideFromTo('#new-game-page', '#signin-page');
        });

        // Beginning a new game.
        $('#new-player').tap(function () {
            var $errorMessage = $('#preferred-name').next('span.error'),
            name = $.trim($('#preferred-name').val()),
            location = $('#preferred-city').val();

            if (name.length > 0 && location.length > 0) {
                $errorMessage.hide();
                screens.slideFromTo('#new-game-page', '#game-page');
                resetMainProgressBars();
            }
            else {
                $errorMessage.text('Please specify player name and preferred city!').CSS3FadeIn();
            }
        });

        // Resuming an old game.
        $('#signin').tap(function () {
            var $container = $('#signin-page form .form-item'),
            name = $.trim($('#username').val());

            if (name.length > 0) {
                $container.addClass('is-ok'); // adds a green icon next to username for a small time
                screens.slideFromTo('#signin-page', '#game-page');
                loadState();
            }
            else {
                alert('Please specify player name!');
            }
        });
        /** END Intro Buttons **/


        /** START Dropdown Buttons **/
        $('.dropdown-toggle').tap(function () {
            // Make selectors.
            var $dropdown = $(this).siblings('.dropdown');
            var $choices = $dropdown.children('li');

            // Slide down the list of choices.
            $dropdown.transition({ height: $choices.length * $choices.height() });
        });

        $('.dropdown li a').tap(function () {
            // Make selectors.
            var $selected = $(this);
            var $dropdown = $selected.closest('.dropdown');

            // Set the selected value's id.
            $($dropdown.attr('data-select')).val($selected.closest('li').attr('data-value'));

            // Show the selected value's label.
            $dropdown.siblings('.dropdown-toggle').find('span.value').text($selected.text());

            // Slide up the list of choices.
            $dropdown.transition({ height: 0 });
        });
        /** END Dropdown Buttons **/


        /** START Setting Buttons **/
        $('#toggle-settings').tap(function () {
            // Transition the screen.
            screens.moveToFront('#overlay', 'fade', 'slow', function () {
                screens.moveToFront('#settings', 'fade', 'slow');
            });
        });

        $('#settings .panel ul .icon').tap(function () {
            $(this).toggleClass('on');
        });

        $('#settings .close').tap(function () {
            // Transition the screen.
            screens.moveFromFront('#settings,#overlay', 'fade', 'slow');
        });
        /** END Setting Buttons **/


        /** START Project List Buttons **/
        $('#big-button').tap(function () {
            if ($('#active-projects li').length >= 3) {
                alert("You've reached the maximum number of active projects.");
                return;
            }

            // Transition the screen.
            showProjectListPage();
        });

        $('#project-list .close').tap(function () {
            // Transition the screen.
            screens.moveFromFront('#project-list', 'slidedown', 'slow', function () {
                screens.moveFromFront('#overlay', 'fade', 'fast');
            });
        });

        $('#project-cancel').tap(function () {
            // Transition the screen.
            screens.moveFromFront('#project-details', 'fade', 'slow');
        });

        // Starting a project from the clipboard.
        $('#project-start').tap(function () {
            // Transition the screen.
            screens.moveFromFront('#project-list,#project-details', 'slidedown', 'slow', function () {
                // 40% chance of random event
                if (Math.random() < 0.4) { // TODO event can fire after win/lose
                    randomEvents.startEvent();
                }
                else {
                    screens.moveFromFront('#overlay', 'fade', 'fast');
                }

                // Start the selected project.
                activeProjects.startProject(clipboard.selectedProject);
            });
        });
        /** END Project List Buttons **/


        /** START Game Over/Congrats Buttons **/
        $('#game-over-restart').tap(function () {
            resetGame();

            // TODO May want to go back to new-game-page?
            screens.moveFromFront('#game-over', 'fade', 'slow');
        });

        $('#level-won').tap(function () {
            resetGame();

            // TODO Will want to load next level in the future
            screens.moveFromFront('#level-won', 'fade', 'slow');
        });

        $('#play-again').tap(function () {
            currentBuilding = 1;
            screens.moveFromFront('#game-won', 'fade', 'slow');
            resetGame();

            // TODO: May want to do something else here
        });

        // TODO update/move
        function resetGame() {
            resetMainProgressBars();    // reset progress bars
            $('#active-projects ul').empty();   // clear projects
        }
        /** END Game Over/Congrats Button **/


        /** START Bill Buttons **/
        $('#main .money').tap(function () {
            showBillPage();
        }).addClass('cursor-pointer');

        $('#payBillButton').tap(function () {
            hideBillPage();
            // TODO: do something with #payBillButton
        });

        $('#notNowButton').tap(function () {
            hideBillPage();
        });
        /** END Bill Buttons **/


        /** START Event Button **/
        $('#eventDismiss').tap(function () {
            screens.moveFromFront('#event-details', 'slidedown', 'slow', function () {
                screens.moveFromFront('#overlay', 'fade', 'fast');

                // Complete the event.
                randomEvents.completeEvent();
            });
        });
        /** END Event Button **/

        /** START Project Complete **/
        $('#project-complete-ok').tap(function () {
            screens.moveFromFront('#project-complete-slider', 'slidedown', 'slow', function () {
                screens.moveFromFront('#overlay', 'fade', 'fast');

                // Complete the project.
                activeProjects.completeProject();
            });
        });
        /** END Project Complete **/
    }

    function showGameWonPage() {
        screens.moveToFront('#game-won', 'fade', 'slow');
    }

    function showGameOverPage() {
        screens.moveToFront('#game-over', 'fade', 'slow');
    }

    function showCongratsPage() {
        $('#game-image-cropped').attr('src', "img/buildings/" + buildings[currentBuilding].picture_cropped);
        $('#next-level-label').html(buildings[currentBuilding].name);
        screens.moveToFront('#level-won', 'fade', 'slow');
    }

    function showBillPage() {
        screens.moveToFront('#overlay', 'fade', 'fast', function () {
            screens.moveToFront('#bill-slider', 'slideup', 'slow');
        });
    }

    function hideBillPage() {
        screens.moveFromFront('#bill-slider', 'slidedown', 'slow', function () {
            screens.moveFromFront('#overlay', 'fade', 'fast');
        });
    }

    function showProjectListPage() {
        screens.moveToFront('#overlay', 'fade', 'fast', function () {
            screens.moveToFront('#project-list', 'slideup', 'slow');
        });
    }

    function showEventPage() {
        screens.moveToFront('#event-details', 'slideup', 'slow');
    }

    function showProjectCompletePage() {
        screens.moveToFront('#overlay', 'fade', 'fast', function () {
            screens.moveToFront('#project-complete-slider', 'slideup', 'slow');
        });
    }

    function fixAnchorTags(id) {
        $(id).tap(function (event) {
            event.preventDefault(); // Prevents the # from being added to the URL for <a> tags.
            event.stopPropagation(); // Prevents the tap event from firing twice.
        });
    }
    /** END Buttons **/
});
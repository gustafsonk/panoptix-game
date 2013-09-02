// Building data.
var buildings =
{
    1: {
        "name": "Gas Station",
        "picture": "gas-station.png",
        "picture_cropped":"gas-station-crop.jpg",
        "time_scale": 1,
        "money_scale": 1
    },
    2: {
        "name": "Strip Mall Retail Store",
        "picture": "strip-mall.png",
        "picture_cropped": "strip-mall.png",
        "time_scale": 2,
        "money_scale": 2
    },
    3: {
        "name": "Small Office",
        "picture": "office.png",
        "picture_cropped": "office-crop.jpg",
        "time_scale": 3,
        "money_scale": 3
    },
    4: {
        "name": "High School",
        "picture": "high-school.png",
        "picture_cropped": "high-school.png",
        "time_scale": 4,
        "money_scale": 4
    },
    5: {
        "name": "University Campus",
        "picture": "university.png",
        "picture_cropped": "university.png",
        "time_scale": 5,
        "money_scale": 5
    },
    6: {
        "name": "World-Class Hospital",
        "picture": "hospital.png",
        "picture_cropped": "hospital.png",
        "time_scale": 6,
        "money_scale": 6
    },
    7: {
        "name": "Class A High-Rise Office",
        "picture": "high-rise.png",
        "picture_cropped": "high-rise.png",
        "time_scale": 7,
        "money_scale": 7
    }
};

// Location data.
var locations =
{
    1: {
        "name": "Jacksonville, FL"
    },
    2: {
        "name": "Anaheim, CA"
    },
    3: {
        "name": "San Antonio, TX"
    },
    4: {
        "name": "Boulder, CO"
    },
    5: {
        "name": "Milwaukee, WI"
    },
    6: {
        "name": "Providence, RI"
    }
};

// Event data.
var events =
{
    1: {
        "name": "Labor strike",
        "description": "Angry about years of paycuts and demoralized by substellar performance by the local football team, maintenance staff decide to strike. Immediate chaos ensues.",
        "buildings": [1, 2, 3, 4, 5, 6, 7],
        "locations": [1, 2, 3, 4, 5, 6],
        "money_base": 0,
        "happiness_base": -5,
        "efficiency_base": -2
    },
    2: {
        "name": "Hurricane",
        "description": "Hurricane Bertha makes landfall, and your building is her path! Repairs, debris everywhere, and very frazzled occupants.",
        "buildings": [1, 2, 3, 4, 5, 6, 7],
        "locations": [1],
        "money_base": -10,
        "happiness_base": -10,
        "efficiency_base": -5
    },
    3: {
        "name": "Broken chiller",
        "description": "Your new chiller was installed with the wrong gasket size on the inlet valve. The seal broke and your entire mechanical room took a bath. (Not to mention the lack of cooling.)",
        "buildings": [6, 7],
        "locations": [1, 2, 3, 4],
        "money_base": 0,
        "happiness_base": -20,
        "efficiency_base": 10
    },
    4: {
        "name": "Run on gasoline",
        "description": "Broken down diplomacy in the Middle East causes a global shortage in oil and a run on gasoline. Lines of cars, angry customers, but at least they are willing to pay for it.",
        "buildings": [1],
        "locations": [1, 2, 3, 4, 5, 6],
        "money_base": 10,
        "happiness_base": -10,
        "efficiency_base": -10
    },
    5: {
        "name": "Holiday weekend",
        "description": "Everyone is getting out of town for the long holiday weekend. That means crowds of impatient people at the gas station.",
        "buildings": [1],
        "locations": [1, 2, 3, 4, 5, 6],
        "money_base": 3,
        "happiness_base": -2,
        "efficiency_base": -2
    },
    6: {
        "name": "Heat wave",
        "description": "Unseasonably warm weather hits town. Local resident Bertha Mussberger says \"It hasn't been this hot since the boys came home from war.\"",
        "buildings": [1, 2, 3, 4, 5, 6, 7],
        "locations": [1, 2, 3, 4, 5, 6],
        "money_base": 0,
        "happiness_base": 1,
        "efficiency_base": -3
    },
    7: {
        "name": "Budget pressure",
        "description": "Global financial recovery has been slower than anticipated. Corporate is shrinking budgets across the board.",
        "buildings": [1, 2, 3, 4, 5, 6, 7],
        "locations": [1, 2, 3, 4, 5, 6],
        "money_base": -5,
        "happiness_base": 0,
        "efficiency_base": 0
    },
    8: {
        "name": "Snowed under!",
        "description": "A winter storm moves in and blankets your entire facility with snow. Access is limited and heating costs are high.",
        "buildings": [1, 2, 3, 4, 5, 6, 7],
        "locations": [4, 5, 6],
        "money_base": 0,
        "happiness_base": -3,
        "efficiency_base": -4
    },
    9: {
        "name": "Night frost",
        "description": "Unusually low temperatures move in over night, leaving frost on the landscape and giving your mechanical equipment trouble.",
        "buildings": [1, 2, 3, 4, 5, 6, 7],
        "locations": [1, 2, 3],
        "money_base": 0,
        "happiness_base": -1,
        "efficiency_base": -1
    },
    10: {
        "name": "Political rally",
        "description": "Uproar over recent legislation has led thousands of protestors to rally. Unfortunately, they chose to do it just outside your building.",
        "buildings": [1, 2, 3, 4, 5, 6, 7],
        "locations": [1, 2, 3, 4, 5, 6],
        "money_base": -5,
        "happiness_base": -2,
        "efficiency_base": 0
    },
    11: {
        "name": "Wind storm",
        "description": "Whoosh! A major wind storm passed through San Antonio. Your occupants and customers are blustered, late, and mad about their messed up hair.",
        "buildings": [1, 2, 3, 4, 5, 6, 7],
        "locations": [3, 6],
        "money_base": 0,
        "happiness_base": -3,
        "efficiency_base": -2
    }
};

// Opportunity data.
var opportunities =
{
    1: {
        "name": "Pest control discount",
        "description": "A local pest control company is running a special for 50% off if you buy an annual contract. \"Spiders, termites, roaches, and other creepy crawlers will be gone for good if you call today.\"",
        "buildings": [1],
        "locations": [1, 2, 3, 4, 5, 6],
        "money_worst": -5,
        "money_best": -1,
        "happiness_worst": -5,
        "happiness_best": 5,
        "efficiency_worst": -1,
        "efficiency_best": 3,
        "message_good": "Nice choice! The pest control people were professional, efficient, and even made a few suggestions to help keep out the creepy crawlers in the future.",
        "message_neutral": "Phew! The pest control people came and went. They killed a bunch of bugs and left your occupants untouched.",
        "message_bad": "Disaster! Acme Pest Control spilled chemicals all over the new pavement. After detours, quarantines, and lots of ventilation, things are finally back to normal."
    },
    2: {
        "name": "Pilot refrigeration technology",
        "description": "FreezeIt Inc has a new technology for refrigerated display cases, claiming to save up to 20% energy. They approached you about a free pilot of their technology.",
        "buildings": [1],
        "locations": [1, 2, 3, 4, 5, 6],
        "money_worst": -25,
        "money_best": 0,
        "happiness_worst": -10,
        "happiness_best": 12,
        "efficiency_worst": -3,
        "efficiency_best": 8,
        "message_good": "Wow! The new refrigeration cases are defying all expectations, saving energy and even increasing sales!",
        "message_neutral": "After a bumpy start, the refrigeration technology appears to be working as planned. No harm done (except maybe a few gray hairs).",
        "message_bad": "You were reminded why you are always wary of pilot projects when this one completely backfired. The technology didn't work and the company promoting it went out of business."
    },
    3: {
        "name": "Free soda machine",
        "description": "The gas station across the street is going out of business. They called and offered you a soda fountain machine that appears to be in good working order. Do you want it?",
        "buildings": [1],
        "locations": [1, 2, 3, 4, 5, 6],
        "money_worst": -8,
        "money_best": 0,
        "happiness_worst": -6,
        "happiness_best": 6,
        "efficiency_worst": -8,
        "efficiency_best": 3,
        "message_good": "Excellent! The free soda machine is a delight to your customers and the new \"Caffeine Crazy\" flavor is keeping employee morale high. Very high.",
        "message_neutral": "There is no such thing as a free lunch, but it seems like the free soda machine is working out just fine. Nice choice.",
        "message_bad": "Uh oh! The free soda machine got your customers sick, attracted a lot of negative press, and may have been a plot by the competing gas station to sabotage your business."
    },
    4: {
        "name": "Utility rebate for outdoor lights",
        "description": "Acme Power and Light is offering a rebate for energy-efficient outdoor lighting. They will pay up to 50% of the cost of an upgrade to High-Intensity Discharge Lamps. Interested?",
        "buildings": [1],
        "locations": [1, 2, 3, 4, 5, 6],
        "money_worst": -12,
        "money_best": -6,
        "happiness_worst": -4,
        "happiness_best": 5,
        "efficiency_worst": -1,
        "efficiency_best": 8,
        "message_good": "Great choice! The new lights are scaring away criminals and bugs, in addition to saving energy and reducing maintenance costs. And the rebate made them very affordable.",
        "message_neutral": "Not bad. After a delay processing the paperwork, the utility rebate came through and the new lights are working fine.",
        "message_bad": "Oh no! Your new outdoor lights are flickering at just the right frequency to drive your customers CRAZY!"
    },
    5: {
        "name": "Security enhancement",
        "description": "With a recent outbreak of crime in your neighborhood, local shops are investing in new security systems. Do you want to follow suit?",
        "buildings": [1],
        "locations": [1, 2, 3, 4, 5, 6],
        "money_worst": -10,
        "money_best": -3,
        "happiness_worst": -8,
        "happiness_best": 12,
        "efficiency_worst": 0,
        "efficiency_best": 3,
        "message_good": "Very wise move. Just a week after the bew system was installed, three local competitors had gunpoint robberies. Customers are all flocking to your safe haven.",
        "message_neutral": "Better safe than sorry. The neighborhood is turning a corner, but your new security system helps everyone feel comfortable. If only it was a little less expensive!",
        "message_bad": "What a mess! After running way over budget and wasting several months of your life, the new system didn't even work. Not to mention the new beeping sound that is annoying your customers."
    },
    6: {
        "name": "Discount offer for landscaping",
        "description": "A local landscape company is running a special on full service care. Trees, grass, sidewalks, water, anything you need for 30% off. Accept the offer?",
        "buildings": [1],
        "locations": [1, 2, 3, 4, 5, 6],
        "money_worst": -8,
        "money_best": -2,
        "happiness_worst": -2,
        "happiness_best": 5,
        "efficiency_worst": -4,
        "efficiency_best": 2,
        "message_good": "All I can say is wow! The place looks amazing, and the discount ended up being even better than originally promised. You will definitely be calling these guys back.",
        "message_neutral": "Hmm. Some very interesting flower choices - clashing colors and obnoxious shedding of leaves and pedals. But other than that, good project. And on budget, so you won't complain too much.",
        "message_bad": "Yikes! The landscaping company charged way more then they originally promised, left a mess, and fired up your boss' allergies."
    },
    7: {
        "name": "Hire new attendant",
        "description": "Take a shot at higher sales by bringing in new talent. Adding one new attendant to your staff is expensive, but it may give your business the shot in the arm it needed. Make the hire?",
        "buildings": [1],
        "locations": [1, 2, 3, 4, 5, 6],
        "money_worst": -150,
        "money_best": -30,
        "happiness_worst": -10,
        "happiness_best": 20,
        "efficiency_worst": -10,
        "efficiency_best": 5,
        "message_good": "What a find! Not only does the new employee thrill and delight your customers and increase business, but she also finds ways to save the environment.",
        "message_neutral": "Not bad. While he definitely has his shortcomings, the new person basically gets his work done.",
        "message_bad": "Uh oh! Your new hire is the opposite of what the business needed. Alienated customers, chaotic operations, and ultimately an expensive lawsuit to fire them."
    },
    8: {
        "name": "Hire new salesperson",
        "description": "Take a shot at higher sales by bringing in new talent. Adding one new salesperson to your staff is expensive, but it may give your business the shot in the arm it needed. Make the hire?",
        "buildings": [2],
        "locations": [1, 2, 3, 4, 5, 6],
        "money_worst": -200,
        "money_best": -50,
        "happiness_worst": -10,
        "happiness_best": 20,
        "efficiency_worst": -10,
        "efficiency_best": 5,
        "message_good": "All star! You found the hidden talent of the retail world. Sales are way up, customers are smiling, and all is well with the universe.",
        "message_neutral": "On the bright side, complaints about your new hire have been minimal and the other staff seem willing to put up with her idiosyncrasies.",
        "message_bad": "So this is what your friends meant when they told you to never hire anyone. After a great showing in the interview, your new hire has annoyed everyone and seems determined to destroy the business."
    },
    9: {
        "name": "Used rooftop air conditioner",
        "description": "A former co-worker called you with a gently used rooftop unit. Do you want to replace your current unit with this one?",
        "buildings": [2],
        "locations": [1, 2, 3, 4, 5, 6],
        "money_worst": -40,
        "money_best": -15,
        "happiness_worst": -8,
        "happiness_best": 5,
        "efficiency_worst": -2,
        "efficiency_best": 10,
        "message_good": "N/A",
        "message_neutral": "N/A",
        "message_bad": "N/A"
    },
    10: {
        "name": "Shared heating & cooling system",
        "description": "The owner of your strip mall is proposing a central cooling and heating plant that will feed all the stores with heating and cooling. The theory is that the economies of scale will save everyone energy. Join?",
        "buildings": [2],
        "locations": [1, 2, 3, 4, 5, 6],
        "money_worst": -30,
        "money_best": -20,
        "happiness_worst": -11,
        "happiness_best": 2,
        "efficiency_worst": -3,
        "efficiency_best": 14,
        "message_good": "N/A",
        "message_neutral": "N/A",
        "message_bad": "N/A"
    },
    11: {
        "name": "New fire alarm technology",
        "description": "A technology company has created a new fire alarm system, promising higher reliability and lower maintenance costs. Give them a try?",
        "buildings": [2],
        "locations": [1, 2, 3, 4, 5, 6],
        "money_worst": -40,
        "money_best": -25,
        "happiness_worst": -3,
        "happiness_best": 4,
        "efficiency_worst": -2,
        "efficiency_best": 0,
        "message_good": "N/A",
        "message_neutral": "N/A",
        "message_bad": "N/A"
    },
    12: {
        "name": "Add new product line",
        "description": "You got an email promoting the \"Wiggamarollee,\" a hot new product that you don't understand, but apparently is all the rage with the kids. Do you want to sell it?",
        "buildings": [2],
        "locations": [1, 2, 3, 4, 5, 6],
        "money_worst": -30,
        "money_best": -20,
        "happiness_worst": -2,
        "happiness_best": 19,
        "efficiency_worst": -10,
        "efficiency_best": -2,
        "message_good": "N/A",
        "message_neutral": "N/A",
        "message_bad": "N/A"
    }
};

// Project data.
var projects =
{
    1: {
        "name": "Lighting retrofit",
        "description": "Replace incandescent lamps with compact fluorescents, and install high efficiency T8 fluorescent tubes with electronic ballasts.",
        "buildings": [1, 2, 3, 4, 5, 6, 7],
        "locations": [1, 2, 3, 4, 5, 6],
        "money_base": -5,
        "happiness_base": -2,
        "efficiency_base": 5,
        "time_base": 0.2
    },
    2: {
        "name": "High-efficiency office equipment",
        "description": "Switch out older computers, copiers, and other office equipment with newer, energy-efficient models.",
        "buildings": [3, 7],
        "locations": [1, 2, 3, 4, 5, 6],
        "money_base": -25,
        "happiness_base": 1,
        "efficiency_base": 2,
        "time_base": 0.5
    },
    3: {
        "name": "Plug load power management",
        "description": "Implement a new power management system to automatically turn off computers and monitors at night and trigger standby modes when not in use.",
        "buildings": [3, 5, 6, 7],
        "locations": [1, 2, 3, 4, 5, 6],
        "money_base": -10,
        "happiness_base": -3,
        "efficiency_base": 3,
        "time_base": 1
    },
    4: {
        "name": "Lobby renovations",
        "description": "Modernize the main lobby with decorative lighting, indoor plants, fountains, new furniture, marble flooring, and new elevator doors.",
        "buildings": [5, 6, 7],
        "locations": [1, 2, 3, 4, 5, 6],
        "money_base": -25,
        "happiness_base": 4,
        "efficiency_base": -2,
        "time_base": 6
    },
    5: {
        "name": "New gas pumps",
        "description": "Replace gas pump stations with brand new models using digital displays, credit card readers, and vapor recovery units.",
        "buildings": [1],
        "locations": [1, 2, 3, 4, 5, 6],
        "money_base": -20,
        "happiness_base": 3,
        "efficiency_base": 1,
        "time_base": 4
    },
    6: {
        "name": "Building automation system",
        "description": "Add controls for heating ventilation and air conditioning to automatically handle temperature settings, schedules, and air flows.",
        "buildings": [1],
        "locations": [1, 2, 3, 4, 5, 6],
        "money_base": -10,
        "happiness_base": 2,
        "efficiency_base": 6,
        "time_base": 2
    },
    7: {
        "name": "Green campaign for customers",
        "description": "Create posters, audio spots, and reward cards for encouraging customers to turn off extra lights, electronics, recycle, and take public transport.",
        "buildings": [1, 2],
        "locations": [1, 2, 3, 4, 5, 6],
        "money_base": -5,
        "happiness_base": 2,
        "efficiency_base": 1,
        "time_base": 1
    },
    8: {
        "name": "Energy training for employees",
        "description": "Provide training for employees about energy issues, then remind them to turn off the lights when they lock up. Then remind them again until they do it.",
        "buildings": [1, 2],
        "locations": [1, 2, 3, 4, 5, 6],
        "money_base": -5,
        "happiness_base": 0,
        "efficiency_base": 4,
        "time_base": 2
    },
    9: {
        "name": "New road sign",
        "description": "Invest in a new sign to attract customers. Bright LED lights, large clear display, and minimal maintenance. And they say it will last 20 years!",
        "buildings": [1],
        "locations": [1, 2, 3, 4, 5, 6],
        "money_base": -8,
        "happiness_base": 3,
        "efficiency_base": -2,
        "time_base": 3
    },
    10: {
        "name": "Holiday party for employees",
        "description": "Give the staff a well-deserved break with a catered holiday party. Party favors, team-building, maybe even a local singer-songwriter to make a night of it.",
        "buildings": [2, 3, 4, 5, 6, 7],
        "locations": [1, 2, 3, 4, 5, 6],
        "money_base": -2,
        "happiness_base": 2,
        "efficiency_base": -1,
        "time_base": 0.2
    },
    11: {
        "name": "Repave property",
        "description": "The clever puns on the marquee sign of a local asphalt company are pretty convincing. Get rid of those cracks and potholes by repaving the entire property.",
        "buildings": [1],
        "locations": [1, 2, 3, 4, 5, 6],
        "money_base": -10,
        "happiness_base": 5,
        "efficiency_base": -2,
        "time_base": 6
    },
    12: {
        "name": "Replumb restrooms",
        "description": "Those pipes beneath the floor are not getting any younger. Be proactive before an emergency, and maybe save a little water by replacing the plumbing.",
        "buildings": [1],
        "locations": [1, 2, 3, 4, 5, 6],
        "money_base": -8,
        "happiness_base": 0,
        "efficiency_base": 2,
        "time_base": 4
    },
    13: {
        "name": "Occupancy sensors for display cases",
        "description": "Add occupancy sensors to display cases in the quick mart. Save energy by turning off lights and sweat heaters when no customers are around.",
        "buildings": [1],
        "locations": [1, 2, 3, 4, 5, 6],
        "money_base": -3,
        "happiness_base": -2,
        "efficiency_base": 2,
        "time_base": 0.3
    },
    14: {
        "name": "Occupancy sensors for lighting",
        "description": "Install occupancy sensors so that lights turn off when no one is around. Your days of lighting up an empty building at night are over.",
        "buildings": [2, 3, 4, 5, 6, 7],
        "locations": [1, 2, 3, 4, 5, 6],
        "money_base": -4,
        "happiness_base": -2,
        "efficiency_base": 3,
        "time_base": 0.5
    },
    15: {
        "name": "Add building controls",
        "description": "Set up schedules and tune operating conditions with a lightweight control system. Run air conditioners, heaters, and lights all from a single computer screen.",
        "buildings": [1],
        "locations": [1, 2, 3, 4, 5, 6],
        "money_base": -20,
        "happiness_base": 2,
        "efficiency_base": 9,
        "time_base": 3
    },
    16: {
        "name": "Central HVAC control system",
        "description": "Add a central control system to run your heating, ventilation, and air conditioning. Keep people comfortable, save energy, and free up your people to stop fiddling with thermostats.",
        "buildings": [2, 3],
        "locations": [1, 2, 3, 4, 5, 6],
        "money_base": -40,
        "happiness_base": 2,
        "efficiency_base": 9,
        "time_base": 5
    },
    17: {
        "name": "Install solar panels",
        "description": "Show the world how high-tech and environmentally-friendly you are with a brand new array of solar photovoltaic panels. Solar power for 5% of your needs.",
        "buildings": [1, 2, 3, 4, 5, 6, 7],
        "locations": [1, 2, 3, 4, 5, 6],
        "money_base": -10,
        "happiness_base": 6,
        "efficiency_base": 5,
        "time_base": 6
    },
    18: {
        "name": "Gas pump maintenance",
        "description": "Maintain and repair those gas pumps for a more seamless customer experience and maybe some reduced vapor losses. And disinfect the handles while you're at it!",
        "buildings": [1],
        "locations": [1, 2, 3, 4, 5, 6],
        "money_base": -2,
        "happiness_base": 3,
        "efficiency_base": 1,
        "time_base": 0.5
    },
    19: {
        "name": "Add a carwash",
        "description": "Invest in your business with an automated carwash behind the quick mart. Not cheap, but a carwash could add a lot of new revenue.",
        "buildings": [1],
        "locations": [1, 2, 3, 4, 5, 6],
        "money_base": -100,
        "happiness_base": 20,
        "efficiency_base": -8,
        "time_base": 8
    },
    20: {
        "name": "Solar water heater",
        "description": "It's solar energy, but not the popular kind. Use the heat of the sun to heat your water and avoid the hassle of boilers, gas, steam, and the guilt of greenhouse gas emissions.",
        "buildings": [1, 2, 3, 4, 5, 6, 7],
        "locations": [1, 2, 3, 4, 5, 6],
        "money_base": -6,
        "happiness_base": 3,
        "efficiency_base": 2,
        "time_base": 3
    },
    21: {
        "name": "Programmable thermostats",
        "description": "Get a handle on heat and air conditioning with new programmable thermostats. Especially good for dialing back energy use during nights and weekends.",
        "buildings": [2, 3],
        "locations": [1, 2, 3, 4, 5, 6],
        "money_base": -8,
        "happiness_base": 5,
        "efficiency_base": 5,
        "time_base": 2
    },
    22: {
        "name": "Demand response",
        "description": "Cold hard cash from the local utility in exchange for your ability to reduce power use a few times a year.",
        "buildings": [1, 2, 3, 4, 5, 6, 7],
        "locations": [1, 2, 3, 4, 5, 6],
        "money_base": 1,
        "happiness_base": -2,
        "efficiency_base": 3,
        "time_base": 0.1
    },
    23: {
        "name": "Send facility team to conference",
        "description": "Your staff can pick up tips and tricks at the annual meeting of \"Facilities And Buildings,\" a trade group focused on improving operations and reducing energy use.",
        "buildings": [4, 5, 6, 7],
        "locations": [1, 2, 3, 4, 5, 6],
        "money_base": -2,
        "happiness_base": 1,
        "efficiency_base": 1,
        "time_base": 0.1
    },
    24: {
        "name": "Energy information software",
        "description": "Whizbang, cloud-based software tools to provide staff with near real-time information about energy use and building operations. Even from their phone or tablet.",
        "buildings": [4, 5, 6, 7],
        "locations": [1, 2, 3, 4, 5, 6],
        "money_base": -5,
        "happiness_base": 2,
        "efficiency_base": 3,
        "time_base": 0.5
    },
    25: {
        "name": "Lights for football stadium",
        "description": "Take your athletics program to the next level with ultra-bright lights on the football field. No more unattended day games. Make your kids feel like superstars.",
        "buildings": [4],
        "locations": [1, 2, 3, 4, 5, 6],
        "money_base": -18,
        "happiness_base": 15,
        "efficiency_base": -5,
        "time_base": 4
    },
    26: {
        "name": "New swimming pool",
        "description": "Become the hero among students and a force in the community by adding an indoor, heated swimming pool. Swim teams, physical education, night programs for adults...",
        "buildings": [4],
        "locations": [1, 2, 3, 4, 5, 6],
        "money_base": -42,
        "happiness_base": 20,
        "efficiency_base": -8,
        "time_base": 6
    },
    27: {
        "name": "Ultra-efficient heat pump",
        "description": "That old unit on the roof has served you heroically for a long time, but it uses a lot of energy. Save lots of energy and get more control over humidity with a new heat pump.",
        "buildings": [2, 3],
        "locations": [1, 2, 3, 4, 5, 6],
        "money_base": -49,
        "happiness_base": 3,
        "efficiency_base": 11,
        "time_base": 6
    },
    28: {
        "name": "High-efficiency chiller",
        "description": "Your staff have a nickname for the chiller in the basement: \"the dinosaur.\" Make this dinosaur extinct with a brand new, high-efficiency chiller with environmentally-friendly refrigerant.",
        "buildings": [4, 5, 6, 7],
        "locations": [1, 2, 3, 4, 5, 6],
        "money_base": -82,
        "happiness_base": 3,
        "efficiency_base": 11,
        "time_base": 9
    },
    29: {
        "name": "Go paperless",
        "description": "Demonstrate your commitment to the environment by abolishing all paper from the workplace. (And hope your employees know how to use a computer!)",
        "buildings": [3, 4, 5, 6, 7],
        "locations": [1, 2, 3, 4, 5, 6],
        "money_base": -5,
        "happiness_base": -5,
        "efficiency_base": 1,
        "time_base": 2
    },
    30: {
        "name": "Lighted sign for storefront",
        "description": "Add some pizzaz to your brand and try to pick up that extra traffic for the store. LED technology reduces the maintenance and energy costs, but it's not cheap.",
        "buildings": [2],
        "locations": [1, 2, 3, 4, 5, 6],
        "money_base": -38,
        "happiness_base": 4,
        "efficiency_base": -1,
        "time_base": 4
    },
    31: {
        "name": "Touch up façade brickwork",
        "description": "Your boss noticed some chipping on the bricks out front last time she visited the store. Now you can choose to do something about it with a simple touchup project.",
        "buildings": [2],
        "locations": [1, 2, 3, 4, 5, 6],
        "money_base": -14,
        "happiness_base": 2,
        "efficiency_base": 0,
        "time_base": 3
    },
    32: {
        "name": "White roof",
        "description": "Cut summer cooling expenses with a few coats of reflective paint on the roof of the building. No one will notice, unless they look at your August electricity bill.",
        "buildings": [2],
        "locations": [1, 2, 3, 4, 5, 6],
        "money_base": -10,
        "happiness_base": 0,
        "efficiency_base": 3,
        "time_base": 2
    },
    33: {
        "name": "Front landscaping",
        "description": "Take charge of the grass and shruberies outside of your store with the services of a local landscaping firm. Green grass, colorful flowers, and happy customers.",
        "buildings": [2],
        "locations": [1, 2, 3, 4, 5, 6],
        "money_base": -11,
        "happiness_base": 3,
        "efficiency_base": -2,
        "time_base": 3
    },
    34: {
        "name": "Winning",
        "description": "Boosts progress bars to simulate winning a level.",
        "buildings": [1, 2, 3, 4, 5, 6, 7],
        "locations": [1, 2, 3, 4, 5, 6],
        "money_base": 50,
        "happiness_base": 50,
        "efficiency_base": 50,
        "time_base": 0.0
    }
};
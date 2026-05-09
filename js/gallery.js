const galleryData = [
  // Kanchipuram
  { branch: "kanchipuram", image: "assets/images/images11.jpeg", title: "Kanchipuram Campus", description: "Main building view" },
  { branch: "kanchipuram", image: "assets/images/images12.jpeg", title: "Kanchipuram Facilities", description: "Classroom infrastructure" },
  { branch: "kanchipuram", image: "assets/images/images13.jpeg", title: "Kanchipuram Laboratory", description: "Science lab facilities" },

  // Ennore
  { branch: "ennore", image: "assets/images/Ennore/ennore (1).jpeg", title: "Ennore Campus", description: "Campus overview" },
  { branch: "ennore", image: "assets/images/Ennore/ennore (2).jpeg", title: "Ennore Facilities", description: "Training facilities" },
  { branch: "ennore", image: "assets/images/Ennore/ennore (3).jpeg", title: "Ennore Events", description: "Student activities" },
  { branch: "ennore", image: "assets/images/Ennore/ennore (4).jpeg", title: "Ennore Building", description: "Main infrastructure" },
  { branch: "ennore", image: "assets/images/Ennore/ennore (5).jpeg", title: "Ennore Classroom", description: "Learning environment" },
  { branch: "ennore", image: "assets/images/Ennore/ennore (6).jpeg", title: "Ennore Laboratory", description: "Practical training" },
  { branch: "ennore", image: "assets/images/Ennore/ennore (7).jpeg", title: "Ennore Library", description: "Study resources" },
  { branch: "ennore", image: "assets/images/Ennore/ennore (8).jpeg", title: "Ennore Sports", description: "Athletic facilities" },
  { branch: "ennore", image: "assets/images/Ennore/ennore (9).jpeg", title: "Ennore Garden", description: "Campus greenery" },
  { branch: "ennore", image: "assets/images/Ennore/ennore (10).jpeg", title: "Ennore Entrance", description: "Main gate" },
  { branch: "ennore", image: "assets/images/Ennore/ennore (11).jpeg", title: "Ennore Corridor", description: "Campus pathways" },
  { branch: "ennore", image: "assets/images/Ennore/ennore (12).jpeg", title: "Ennore Workshop", description: "Hands-on training" },
  { branch: "ennore", image: "assets/images/Ennore/ennore (13).jpeg", title: "Ennore Auditorium", description: "Event space" },
  { branch: "ennore", image: "assets/images/Ennore/ennore (14).jpeg", title: "Ennore Cafeteria", description: "Student dining" },
  { branch: "ennore", image: "assets/images/Ennore/ennore (15).jpeg", title: "Ennore Computer Lab", description: "IT facilities" },
  { branch: "ennore", image: "assets/images/Ennore/ennore (16).jpeg", title: "Ennore Medical Room", description: "Health services" },
  { branch: "ennore", image: "assets/images/Ennore/ennore (17).jpeg", title: "Ennore Playground", description: "Recreational area" },
  { branch: "ennore", image: "assets/images/Ennore/ennore (18).jpeg", title: "Ennore Parking", description: "Vehicle facilities" },
  { branch: "ennore", image: "assets/images/Ennore/ennore (19).jpeg", title: "Ennore Reception", description: "Front office" },
  { branch: "ennore", image: "assets/images/Ennore/ennore (20).jpeg", title: "Ennore Conference Hall", description: "Meeting space" },
  { branch: "ennore", image: "assets/images/Ennore/ennore (21).jpeg", title: "Ennore Staff Room", description: "Faculty area" },
  { branch: "ennore", image: "assets/images/Ennore/ennore (22).jpeg", title: "Ennore Store", description: "Campus shop" },
  { branch: "ennore", image: "assets/images/Ennore/ennore (23).jpeg", title: "Ennore Security", description: "Campus safety" },
  { branch: "ennore", image: "assets/images/Ennore/ennore (24).jpeg", title: "Ennore Water Facility", description: "Campus amenities" },
  { branch: "ennore", image: "assets/images/Ennore/ennore (25).jpeg", title: "Ennore Power Backup", description: "Infrastructure support" },
  { branch: "ennore", image: "assets/images/Ennore/ennore (26).jpeg", title: "Ennore Waste Management", description: "Environmental facilities" },
  { branch: "ennore", image: "assets/images/Ennore/ennore (27).jpeg", title: "Ennore Campus View", description: "Campus view" },
  // Saalai
  { branch: "saalai", image: "assets/images/images13.jpeg", title: "Saalai Campus", description: "Campus entrance" },
  { branch: "saalai", image: "assets/images/images14.jpeg", title: "Saalai Facilities", description: "Infrastructure" },
  { branch: "saalai", image: "assets/images/images12.jpeg", title: "Saalai Activities", description: "Campus life" },

  // Nagapattinam
  { branch: "nagapattinam", image: "assets/images/Nagapattinam/nagapattinam 1 (1).jpg", title: "Nagapattinam Campus View 1", description: "Main campus entrance" },
  { branch: "nagapattinam", image: "assets/images/Nagapattinam/nagapattinam 1 (2).jpg", title: "Nagapattinam Campus View 2", description: "Academic building" },
  { branch: "nagapattinam", image: "assets/images/Nagapattinam/nagapattinam 1 (3).jpg", title: "Nagapattinam Campus View 3", description: "Library facility" },
  { branch: "nagapattinam", image: "assets/images/Nagapattinam/nagapattinam 1 (4).jpg", title: "Nagapattinam Campus View 4", description: "Computer lab" },
  { branch: "nagapattinam", image: "assets/images/Nagapattinam/nagapattinam 1 (5).jpg", title: "Nagapattinam Campus View 5", description: "Science laboratory" },
  { branch: "nagapattinam", image: "assets/images/Nagapattinam/nagapattinam 1 (6).jpg", title: "Nagapattinam Campus View 6", description: "Classroom facility" },
  { branch: "nagapattinam", image: "assets/images/Nagapattinam/nagapattinam 1 (7).jpg", title: "Nagapattinam Campus View 7", description: "Administrative office" },
  { branch: "nagapattinam", image: "assets/images/Nagapattinam/nagapattinam 1 (8).jpg", title: "Nagapattinam Campus View 8", description: "Student lounge" },
  { branch: "nagapattinam", image: "assets/images/Nagapattinam/nagapattinam 1 (9).jpg", title: "Nagapattinam Campus View 9", description: "Sports ground" },
  { branch: "nagapattinam", image: "assets/images/Nagapattinam/nagapattinam 1 (10).jpg", title: "Nagapattinam Campus View 10", description: "Auditorium" },
  { branch: "nagapattinam", image: "assets/images/Nagapattinam/nagapattinam 1 (11).jpg", title: "Nagapattinam Campus View 11", description: "Cafeteria" },
  { branch: "nagapattinam", image: "assets/images/Nagapattinam/nagapattinam 1 (12).jpg", title: "Nagapattinam Campus View 12", description: "Parking area" },
  { branch: "nagapattinam", image: "assets/images/Nagapattinam/nagapattinam 1 (13).jpg", title: "Nagapattinam Campus View 13", description: "Garden area" },
  { branch: "nagapattinam", image: "assets/images/Nagapattinam/nagapattinam 1 (14).jpg", title: "Nagapattinam Campus View 14", description: "Conference hall" },
  { branch: "nagapattinam", image: "assets/images/Nagapattinam/nagapattinam 1 (15).jpg", title: "Nagapattinam Campus View 15", description: "Workshop facility" },
  { branch: "nagapattinam", image: "assets/images/Nagapattinam/nagapattinam 1 (16).jpg", title: "Nagapattinam Campus View 16", description: "Medical room" },
  { branch: "nagapattinam", image: "assets/images/Nagapattinam/nagapattinam 1 (17).jpg", title: "Nagapattinam Campus View 17", description: "Staff room" },
  { branch: "nagapattinam", image: "assets/images/Nagapattinam/nagapattinam 1 (18).jpg", title: "Nagapattinam Campus View 18", description: "Exhibition hall" },
  { branch: "nagapattinam", image: "assets/images/Nagapattinam/nagapattinam 1 (19).jpg", title: "Nagapattinam Campus View 19", description: "Campus night view" },
  { branch: "nagapattinam", image: "assets/images/Nagapattinam/nagapattinam 1 (20).jpg", title: "Nagapattinam Campus View 20", description: "Main building" },
  { branch: "nagapattinam", image: "assets/images/Nagapattinam/nagapattinam 1 (21).jpg", title: "Nagapattinam Campus View 21", description: "Laboratory complex" },
  { branch: "nagapattinam", image: "assets/images/Nagapattinam/nagapattinam 1 (22).jpg", title: "Nagapattinam Campus View 22", description: "Library extension" },
  { branch: "nagapattinam", image: "assets/images/Nagapattinam/nagapattinam 1 (23).jpg", title: "Nagapattinam Campus View 23", description: "Sports facilities" },
  { branch: "nagapattinam", image: "assets/images/Nagapattinam/nagapattinam 1 (24).jpg", title: "Nagapattinam Campus View 24", description: "Gymnasium" },
  { branch: "nagapattinam", image: "assets/images/Nagapattinam/nagapattinam 1 (25).jpg", title: "Nagapattinam Campus View 25", description: "Cafeteria extension" },
  { branch: "nagapattinam", image: "assets/images/Nagapattinam/nagapattinam 1 (26).jpg", title: "Nagapattinam Campus View 26", description: "Parking lot" },
  { branch: "nagapattinam", image: "assets/images/Nagapattinam/nagapattinam 1 (27).jpg", title: "Nagapattinam Campus View 27", description: "Garden area" },
  { branch: "nagapattinam", image: "assets/images/Nagapattinam/nagapattinam 1 (28).jpg", title: "Nagapattinam Campus View 28", description: "Conference room" },
  { branch: "nagapattinam", image: "assets/images/Nagapattinam/nagapattinam 1 (29).jpg", title: "Nagapattinam Campus View 29", description: "Computer center" },
  { branch: "nagapattinam", image: "assets/images/Nagapattinam/nagapattinam 1 (30).jpg", title: "Nagapattinam Campus View 30", description: "Research lab" },
  { branch: "nagapattinam", image: "assets/images/Nagapattinam/nagapattinam 1 (31).jpg", title: "Nagapattinam Campus View 31", description: "Admin block" },
  { branch: "nagapattinam", image: "assets/images/Nagapattinam/nagapattinam 1 (32).jpg", title: "Nagapattinam Campus View 32", description: "Student center" },
  { branch: "nagapattinam", image: "assets/images/Nagapattinam/nagapattinam 1 (33).jpg", title: "Nagapattinam Campus View 33", description: "Workshop area" },
  { branch: "nagapattinam", image: "assets/images/Nagapattinam/nagapattinam 1 (34).jpg", title: "Nagapattinam Campus View 34", description: "Hostel facility" },
  { branch: "nagapattinam", image: "assets/images/Nagapattinam/nagapattinam 1 (35).jpg", title: "Nagapattinam Campus View 35", description: "Playground" },
  { branch: "nagapattinam", image: "assets/images/Nagapattinam/nagapattinam 1 (36).jpg", title: "Nagapattinam Campus View 36", description: "Medical center" },
  { branch: "nagapattinam", image: "assets/images/Nagapattinam/nagapattinam 1 (37).jpg", title: "Nagapattinam Campus View 37", description: "Library main" },
  { branch: "nagapattinam", image: "assets/images/Nagapattinam/nagapattinam 1 (38).jpg", title: "Nagapattinam Campus View 38", description: "Auditorium main" },
  { branch: "nagapattinam", image: "assets/images/Nagapattinam/nagapattinam 1 (39).jpg", title: "Nagapattinam Campus View 39", description: "Sports ground" },
  { branch: "nagapattinam", image: "assets/images/Nagapattinam/nagapattinam 1 (40).jpg", title: "Nagapattinam Campus View 40", description: "Gymnasium" },
  { branch: "nagapattinam", image: "assets/images/Nagapattinam/nagapattinam 1 (41).jpg", title: "Nagapattinam Campus View 41", description: "Cafeteria main" },
  { branch: "nagapattinam", image: "assets/images/Nagapattinam/nagapattinam 1 (42).jpg", title: "Nagapattinam Campus View 42", description: "Parking main" },
  { branch: "nagapattinam", image: "assets/images/Nagapattinam/nagapattinam 1 (43).jpg", title: "Nagapattinam Campus View 43", description: "Garden main" },
  { branch: "nagapattinam", image: "assets/images/Nagapattinam/nagapattinam 1 (44).jpg", title: "Nagapattinam Campus View 44", description: "Conference main" },
  { branch: "nagapattinam", image: "assets/images/Nagapattinam/nagapattinam 1 (45).jpg", title: "Nagapattinam Campus View 45", description: "Computer center main" },
  { branch: "nagapattinam", image: "assets/images/Nagapattinam/nagapattinam 1 (46).jpg", title: "Nagapattinam Campus View 46", description: "Research lab main" },
  { branch: "nagapattinam", image: "assets/images/Nagapattinam/nagapattinam 1 (47).jpg", title: "Nagapattinam Campus View 47", description: "Admin block main" },
  { branch: "nagapattinam", image: "assets/images/Nagapattinam/nagapattinam 1 (48).jpg", title: "Nagapattinam Campus View 48", description: "Student center main" },
  { branch: "nagapattinam", image: "assets/images/Nagapattinam/nagapattinam 1 (49).jpg", title: "Nagapattinam Campus View 49", description: "Workshop area main" },
  { branch: "nagapattinam", image: "assets/images/Nagapattinam/nagapattinam 1 (50).jpg", title: "Nagapattinam Campus View 50", description: "Hostel facility main" },

  // Nemilicherry
  { branch: "nemilicherry", image: "assets/images/Nemilicherry/Nemilicherry (1).jpg", title: "Nemilicherry Campus View 1", description: "Campus overview" },
  { branch: "nemilicherry", image: "assets/images/Nemilicherry/Nemilicherry (2).jpg", title: "Nemilicherry Campus View 2", description: "Educational facilities" },
  { branch: "nemilicherry", image: "assets/images/Nemilicherry/Nemilicherry (3).jpg", title: "Nemilicherry Campus View 3", description: "Campus activities" },
  { branch: "nemilicherry", image: "assets/images/Nemilicherry/Nemilicherry (4).jpg", title: "Nemilicherry Campus View 4", description: "Academic building" },
  { branch: "nemilicherry", image: "assets/images/Nemilicherry/Nemilicherry (5).jpg", title: "Nemilicherry Campus View 5", description: "Library facility" },
  { branch: "nemilicherry", image: "assets/images/Nemilicherry/Nemilicherry (6).jpg", title: "Nemilicherry Campus View 6", description: "Computer lab" },
  { branch: "nemilicherry", image: "assets/images/Nemilicherry/Nemilicherry (7).jpg", title: "Nemilicherry Campus View 7", description: "Science laboratory" },
  { branch: "nemilicherry", image: "assets/images/Nemilicherry/Nemilicherry (8).jpg", title: "Nemilicherry Campus View 8", description: "Classroom facility" },
  { branch: "nemilicherry", image: "assets/images/Nemilicherry/Nemilicherry (9).jpg", title: "Nemilicherry Campus View 9", description: "Administrative office" },
  { branch: "nemilicherry", image: "assets/images/Nemilicherry/Nemilicherry (10).jpg", title: "Nemilicherry Campus View 10", description: "Student lounge" },
  { branch: "nemilicherry", image: "assets/images/Nemilicherry/Nemilicherry (11).jpg", title: "Nemilicherry Campus View 11", description: "Sports ground" },
  { branch: "nemilicherry", image: "assets/images/Nemilicherry/Nemilicherry (12).jpg", title: "Nemilicherry Campus View 12", description: "Auditorium" },
  { branch: "nemilicherry", image: "assets/images/Nemilicherry/Nemilicherry (13).jpg", title: "Nemilicherry Campus View 13", description: "Cafeteria" },
  { branch: "nemilicherry", image: "assets/images/Nemilicherry/Nemilicherry (14).jpg", title: "Nemilicherry Campus View 14", description: "Parking area" },
  { branch: "nemilicherry", image: "assets/images/Nemilicherry/Nemilicherry (15).jpg", title: "Nemilicherry Campus View 15", description: "Garden area" },
  { branch: "nemilicherry", image: "assets/images/Nemilicherry/Nemilicherry (16).jpg", title: "Nemilicherry Campus View 16", description: "Conference hall" },
  { branch: "nemilicherry", image: "assets/images/Nemilicherry/Nemilicherry (17).jpg", title: "Nemilicherry Campus View 17", description: "Workshop facility" },
  { branch: "nemilicherry", image: "assets/images/Nemilicherry/Nemilicherry (18).jpg", title: "Nemilicherry Campus View 18", description: "Medical room" },
  { branch: "nemilicherry", image: "assets/images/Nemilicherry/Nemilicherry (19).jpg", title: "Nemilicherry Campus View 19", description: "Staff room" },
  { branch: "nemilicherry", image: "assets/images/Nemilicherry/Nemilicherry (20).jpg", title: "Nemilicherry Campus View 20", description: "Exhibition hall" },
  { branch: "nemilicherry", image: "assets/images/Nemilicherry/Nemilicherry (21).jpg", title: "Nemilicherry Campus View 21", description: "Campus night view" },
  { branch: "nemilicherry", image: "assets/images/Nemilicherry/Nemilicherry (22).jpg", title: "Nemilicherry Campus View 22", description: "Main entrance" },
  { branch: "nemilicherry", image: "assets/images/Nemilicherry/Nemilicherry (23).jpg", title: "Nemilicherry Campus View 23", description: "Reception area" },
  { branch: "nemilicherry", image: "assets/images/Nemilicherry/Nemilicherry (24).jpg", title: "Nemilicherry Campus View 24", description: "Principal office" },
  { branch: "nemilicherry", image: "assets/images/Nemilicherry/Nemilicherry (25).jpg", title: "Nemilicherry Campus View 25", description: "Laboratory complex" },
  { branch: "nemilicherry", image: "assets/images/Nemilicherry/Nemilicherry (26).jpg", title: "Nemilicherry Campus View 26", description: "Sports complex" },
  { branch: "nemilicherry", image: "assets/images/Nemilicherry/Nemilicherry (27).jpg", title: "Nemilicherry Campus View 27", description: "Library building" },
  { branch: "nemilicherry", image: "assets/images/Nemilicherry/Nemilicherry (28).jpg", title: "Nemilicherry Campus View 28", description: "Computer center" },
  { branch: "nemilicherry", image: "assets/images/Nemilicherry/Nemilicherry (29).jpg", title: "Nemilicherry Campus View 29", description: "Science block" },
  { branch: "nemilicherry", image: "assets/images/Nemilicherry/Nemilicherry (30).jpg", title: "Nemilicherry Campus View 30", description: "Arts block" },
  { branch: "nemilicherry", image: "assets/images/Nemilicherry/Nemilicherry (31).jpg", title: "Nemilicherry Campus View 31", description: "Commerce block" },
  { branch: "nemilicherry", image: "assets/images/Nemilicherry/Nemilicherry (32).jpg", title: "Nemilicherry Campus View 32", description: "Management studies" },
  { branch: "nemilicherry", image: "assets/images/Nemilicherry/Nemilicherry (33).jpg", title: "Nemilicherry Campus View 33", description: "Hostel facility" },
  { branch: "nemilicherry", image: "assets/images/Nemilicherry/Nemilicherry (34).jpg", title: "Nemilicherry Campus View 34", description: "Mess hall" },
  { branch: "nemilicherry", image: "assets/images/Nemilicherry/Nemilicherry (35).jpg", title: "Nemilicherry Campus View 35", description: "Playground" },
  { branch: "nemilicherry", image: "assets/images/Nemilicherry/Nemilicherry (36).jpg", title: "Nemilicherry Campus View 36", description: "Basketball court" },
  { branch: "nemilicherry", image: "assets/images/Nemilicherry/Nemilicherry (37).jpg", title: "Nemilicherry Campus View 37", description: "Volleyball court" },
  { branch: "nemilicherry", image: "assets/images/Nemilicherry/Nemilicherry (38).jpg", title: "Nemilicherry Campus View 38", description: "Indoor stadium" },
  { branch: "nemilicherry", image: "assets/images/Nemilicherry/Nemilicherry (39).jpg", title: "Nemilicherry Campus View 39", description: "Gymnasium" },
  { branch: "nemilicherry", image: "assets/images/Nemilicherry/Nemilicherry (40).jpg", title: "Nemilicherry Campus View 40", description: "Yoga hall" },
  { branch: "nemilicherry", image: "assets/images/Nemilicherry/Nemilicherry (41).jpg", title: "Nemilicherry Campus View 41", description: "Music room" },
  { branch: "nemilicherry", image: "assets/images/Nemilicherry/Nemilicherry (42).jpg", title: "Nemilicherry Campus View 42", description: "Dance studio" },
  { branch: "nemilicherry", image: "assets/images/Nemilicherry/Nemilicherry (43).jpg", title: "Nemilicherry Campus View 43", description: "Art gallery" },
  { branch: "nemilicherry", image: "assets/images/Nemilicherry/Nemilicherry (44).jpg", title: "Nemilicherry Campus View 44", description: "Seminar hall" },
  { branch: "nemilicherry", image: "assets/images/Nemilicherry/Nemilicherry (45).jpg", title: "Nemilicherry Campus View 45", description: "Conference room" },
  { branch: "nemilicherry", image: "assets/images/Nemilicherry/Nemilicherry (46).jpg", title: "Nemilicherry Campus View 46", description: "Research center" },
  { branch: "nemilicherry", image: "assets/images/Nemilicherry/Nemilicherry (47).jpg", title: "Nemilicherry Campus View 47", description: "Innovation lab" },
  { branch: "nemilicherry", image: "assets/images/Nemilicherry/Nemilicherry (48).jpg", title: "Nemilicherry Campus View 48", description: "Incubation center" },
  { branch: "nemilicherry", image: "assets/images/Nemilicherry/Nemilicherry (49).jpg", title: "Nemilicherry Campus View 49", description: "Campus landscape" },

  // Thiruthani
  { branch: "thiruthani", image: "assets/images/images14.jpeg", title: "Thiruthani Campus", description: "Campus overview" },
  { branch: "thiruthani", image: "assets/images/images13.jpeg", title: "Thiruthani Facilities", description: "Training facilities" },
  { branch: "thiruthani", image: "assets/images/images11.jpeg", title: "Thiruthani Events", description: "Student activities" },

  // Pudur
  { branch: "pudur", image: "assets/images/images14.jpeg", title: "Pudur Campus", description: "Campus entrance" },
  { branch: "pudur", image: "assets/images/images12.jpeg", title: "Pudur Facilities", description: "Infrastructure" },
  { branch: "pudur", image: "assets/images/images11.jpeg", title: "Pudur Activities", description: "Campus life" },

  // Thiruvallur
  { branch: "thiruvallur", image: "assets/images/thiruvallur/Thiruvallur (1).jpeg", title: "Thiruvallur Campus View 1", description: "Main campus entrance" },
  { branch: "thiruvallur", image: "assets/images/thiruvallur/Thiruvallur (2).jpeg", title: "Thiruvallur Campus View 2", description: "Academic building" },
  { branch: "thiruvallur", image: "assets/images/thiruvallur/Thiruvallur (3).jpeg", title: "Thiruvallur Campus View 3", description: "Library facility" },
  { branch: "thiruvallur", image: "assets/images/thiruvallur/Thiruvallur (4).jpeg", title: "Thiruvallur Campus View 4", description: "Computer lab" },
  { branch: "thiruvallur", image: "assets/images/thiruvallur/Thiruvallur (5).jpeg", title: "Thiruvallur Campus View 5", description: "Science laboratory" },
  { branch: "thiruvallur", image: "assets/images/thiruvallur/Thiruvallur (6).jpeg", title: "Thiruvallur Campus View 6", description: "Classroom facility" },
  { branch: "thiruvallur", image: "assets/images/thiruvallur/Thiruvallur (7).jpeg", title: "Thiruvallur Campus View 7", description: "Administrative office" },
  { branch: "thiruvallur", image: "assets/images/thiruvallur/Thiruvallur (8).jpeg", title: "Thiruvallur Campus View 8", description: "Student lounge" },
  { branch: "thiruvallur", image: "assets/images/thiruvallur/Thiruvallur (9).jpeg", title: "Thiruvallur Campus View 9", description: "Sports ground" },
  { branch: "thiruvallur", image: "assets/images/thiruvallur/Thiruvallur (10).jpeg", title: "Thiruvallur Campus View 10", description: "Auditorium" },
  { branch: "thiruvallur", image: "assets/images/thiruvallur/Thiruvallur (11).jpeg", title: "Thiruvallur Campus View 11", description: "Cafeteria" },
  { branch: "thiruvallur", image: "assets/images/thiruvallur/Thiruvallur (12).jpeg", title: "Thiruvallur Campus View 12", description: "Parking area" },
  { branch: "thiruvallur", image: "assets/images/thiruvallur/Thiruvallur (13).jpeg", title: "Thiruvallur Campus View 13", description: "Garden area" },
  { branch: "thiruvallur", image: "assets/images/thiruvallur/Thiruvallur (14).jpeg", title: "Thiruvallur Campus View 14", description: "Conference hall" },
  { branch: "thiruvallur", image: "assets/images/thiruvallur/Thiruvallur (15).jpeg", title: "Thiruvallur Campus View 15", description: "Workshop facility" },
  { branch: "thiruvallur", image: "assets/images/thiruvallur/Thiruvallur (16).jpeg", title: "Thiruvallur Campus View 16", description: "Medical room" },
  { branch: "thiruvallur", image: "assets/images/thiruvallur/Thiruvallur (17).jpeg", title: "Thiruvallur Campus View 17", description: "Staff room" },
  { branch: "thiruvallur", image: "assets/images/thiruvallur/Thiruvallur (18).jpeg", title: "Thiruvallur Campus View 18", description: "Exhibition hall" },
  { branch: "thiruvallur", image: "assets/images/thiruvallur/Thiruvallur (19).jpeg", title: "Thiruvallur Campus View 19", description: "Campus night view" },
  { branch: "thiruvallur", image: "assets/images/thiruvallur/Thiruvallur (20).jpeg", title: "Thiruvallur Campus View 20", description: "Main building" },
  { branch: "thiruvallur", image: "assets/images/thiruvallur/Thiruvallur (21).jpeg", title: "Thiruvallur Campus View 21", description: "Laboratory complex" },
  { branch: "thiruvallur", image: "assets/images/thiruvallur/Thiruvallur (22).jpeg", title: "Thiruvallur Campus View 22", description: "Library extension" },
  { branch: "thiruvallur", image: "assets/images/thiruvallur/Thiruvallur (23).jpeg", title: "Thiruvallur Campus View 23", description: "Sports facilities" },
  { branch: "thiruvallur", image: "assets/images/thiruvallur/Thiruvallur (24).jpeg", title: "Thiruvallur Campus View 24", description: "Gymnasium" },
  { branch: "thiruvallur", image: "assets/images/thiruvallur/Thiruvallur (25).jpeg", title: "Thiruvallur Campus View 25", description: "Cafeteria extension" },
  { branch: "thiruvallur", image: "assets/images/thiruvallur/Thiruvallur (26).jpeg", title: "Thiruvallur Campus View 26", description: "Parking lot" },
  { branch: "thiruvallur", image: "assets/images/thiruvallur/Thiruvallur (27).jpeg", title: "Thiruvallur Campus View 27", description: "Garden area" },
  { branch: "thiruvallur", image: "assets/images/thiruvallur/Thiruvallur (28).jpeg", title: "Thiruvallur Campus View 28", description: "Conference room" },
  { branch: "thiruvallur", image: "assets/images/thiruvallur/Thiruvallur (29).jpeg", title: "Thiruvallur Campus View 29", description: "Computer center" },
  { branch: "thiruvallur", image: "assets/images/thiruvallur/Thiruvallur (30).jpeg", title: "Thiruvallur Campus View 30", description: "Research lab" },
  { branch: "thiruvallur", image: "assets/images/thiruvallur/Thiruvallur (31).jpeg", title: "Thiruvallur Campus View 31", description: "Admin block" },
  { branch: "thiruvallur", image: "assets/images/thiruvallur/Thiruvallur (32).jpeg", title: "Thiruvallur Campus View 32", description: "Student center" },
  { branch: "thiruvallur", image: "assets/images/thiruvallur/Thiruvallur (33).jpeg", title: "Thiruvallur Campus View 33", description: "Workshop area" },
  { branch: "thiruvallur", image: "assets/images/thiruvallur/Thiruvallur (34).jpeg", title: "Thiruvallur Campus View 34", description: "Hostel facility" },
  { branch: "thiruvallur", image: "assets/images/thiruvallur/Thiruvallur (35).jpeg", title: "Thiruvallur Campus View 35", description: "Playground" },
  { branch: "thiruvallur", image: "assets/images/thiruvallur/Thiruvallur (36).jpeg", title: "Thiruvallur Campus View 36", description: "Medical center" },
  { branch: "thiruvallur", image: "assets/images/thiruvallur/Thiruvallur (37).jpeg", title: "Thiruvallur Campus View 37", description: "Library main" },
  { branch: "thiruvallur", image: "assets/images/thiruvallur/Thiruvallur (38).jpeg", title: "Thiruvallur Campus View 38", description: "Auditorium main" },
  { branch: "thiruvallur", image: "assets/images/thiruvallur/Thiruvallur (39).jpeg", title: "Thiruvallur Campus View 39", description: "Sports ground" },
  { branch: "thiruvallur", image: "assets/images/thiruvallur/Thiruvallur (40).jpeg", title: "Thiruvallur Campus View 40", description: "Gymnasium" },
  { branch: "thiruvallur", image: "assets/images/thiruvallur/Thiruvallur (41).jpeg", title: "Thiruvallur Campus View 41", description: "Cafeteria main" },
  { branch: "thiruvallur", image: "assets/images/thiruvallur/Thiruvallur (42).jpeg", title: "Thiruvallur Campus View 42", description: "Parking main" },
  { branch: "thiruvallur", image: "assets/images/thiruvallur/Thiruvallur (43).jpeg", title: "Thiruvallur Campus View 43", description: "Garden main" },
  { branch: "thiruvallur", image: "assets/images/thiruvallur/Thiruvallur (44).jpeg", title: "Thiruvallur Campus View 44", description: "Conference main" },
  { branch: "thiruvallur", image: "assets/images/thiruvallur/Thiruvallur (45).jpeg", title: "Thiruvallur Campus View 45", description: "Computer center main" },
  { branch: "thiruvallur", image: "assets/images/thiruvallur/Thiruvallur (46).jpeg", title: "Thiruvallur Campus View 46", description: "Research lab main" },
  { branch: "thiruvallur", image: "assets/images/thiruvallur/Thiruvallur (47).jpeg", title: "Thiruvallur Campus View 47", description: "Admin block main" },
  
  // Poonamallee
  { branch: "poonamallee", image: "assets/images/poonamallee/Poonamallee1  (1).jpeg", title: "Poonamallee Campus View 1", description: "Main campus entrance" },
  { branch: "poonamallee", image: "assets/images/poonamallee/Poonamallee1  (2).jpeg", title: "Poonamallee Campus View 2", description: "Academic building" },
  { branch: "poonamallee", image: "assets/images/poonamallee/Poonamallee1  (3).jpeg", title: "Poonamallee Campus View 3", description: "Library facility" },
  { branch: "poonamallee", image: "assets/images/poonamallee/Poonamallee1  (4).jpeg", title: "Poonamallee Campus View 4", description: "Computer lab" },
  { branch: "poonamallee", image: "assets/images/poonamallee/Poonamallee1  (5).jpeg", title: "Poonamallee Campus View 5", description: "Science laboratory" },
  { branch: "poonamallee", image: "assets/images/poonamallee/Poonamallee1  (6).jpeg", title: "Poonamallee Campus View 6", description: "Classroom facility" },
  { branch: "poonamallee", image: "assets/images/poonamallee/Poonamallee1  (7).jpeg", title: "Poonamallee Campus View 7", description: "Administrative office" },
  { branch: "poonamallee", image: "assets/images/poonamallee/Poonamallee1  (8).jpeg", title: "Poonamallee Campus View 8", description: "Student lounge" },
  { branch: "poonamallee", image: "assets/images/poonamallee/Poonamallee1  (9).jpeg", title: "Poonamallee Campus View 9", description: "Sports ground" },
  { branch: "poonamallee", image: "assets/images/poonamallee/Poonamallee1  (10).jpeg", title: "Poonamallee Campus View 10", description: "Auditorium" },
  { branch: "poonamallee", image: "assets/images/poonamallee/Poonamallee1  (11).jpeg", title: "Poonamallee Campus View 11", description: "Cafeteria" },
  { branch: "poonamallee", image: "assets/images/poonamallee/Poonamallee1  (12).jpeg", title: "Poonamallee Campus View 12", description: "Parking area" },
  { branch: "poonamallee", image: "assets/images/poonamallee/Poonamallee1  (13).jpeg", title: "Poonamallee Campus View 13", description: "Garden area" },
  { branch: "poonamallee", image: "assets/images/poonamallee/Poonamallee1  (14).jpeg", title: "Poonamallee Campus View 14", description: "Conference hall" },
  { branch: "poonamallee", image: "assets/images/poonamallee/Poonamallee1  (15).jpeg", title: "Poonamallee Campus View 15", description: "Workshop facility" },
  { branch: "poonamallee", image: "assets/images/poonamallee/Poonamallee1  (16).jpeg", title: "Poonamallee Campus View 16", description: "Medical room" },
  { branch: "poonamallee", image: "assets/images/poonamallee/Poonamallee1  (17).jpeg", title: "Poonamallee Campus View 17", description: "Staff room" },
  { branch: "poonamallee", image: "assets/images/poonamallee/Poonamallee1  (18).jpeg", title: "Poonamallee Campus View 18", description: "Exhibition hall" },
  { branch: "poonamallee", image: "assets/images/poonamallee/Poonamallee1  (19).jpeg", title: "Poonamallee Campus View 19", description: "Campus night view" },
  { branch: "poonamallee", image: "assets/images/poonamallee/Poonamallee1  (20).jpeg", title: "Poonamallee Campus View 20", description: "Campus night view" },
  { branch: "poonamallee", image: "assets/images/poonamallee/Poonamallee1  (21).jpeg", title: "Poonamallee Campus View 21", description: "Campus night view" },
  { branch: "poonamallee", image: "assets/images/poonamallee/Poonamallee1  (22).jpeg", title: "Poonamallee Campus View 22", description: "Campus night view" },
  { branch: "poonamallee", image: "assets/images/poonamallee/Poonamallee1  (23).jpeg", title: "Poonamallee Campus View 23", description: "Campus night view" },
  { branch: "poonamallee", image: "assets/images/poonamallee/Poonamallee1  (24).jpeg", title: "Poonamallee Campus View 24", description: "Campus night view" },
  { branch: "poonamallee", image: "assets/images/poonamallee/Poonamallee1  (25).jpeg", title: "Poonamallee Campus View 25", description: "Campus night view" },
  { branch: "poonamallee", image: "assets/images/poonamallee/Poonamallee1  (26).jpeg", title: "Poonamallee Campus View 26", description: "Campus night view" },
  { branch: "poonamallee", image: "assets/images/poonamallee/Poonamallee1  (27).jpeg", title: "Poonamallee Campus View 27", description: "Campus night view" },
  { branch: "poonamallee", image: "assets/images/poonamallee/Poonamallee1  (28).jpeg", title: "Poonamallee Campus View 28", description: "Campus night view" },
  { branch: "poonamallee", image: "assets/images/poonamallee/Poonamallee1  (29).jpeg", title: "Poonamallee Campus View 29", description: "Campus night view" },
  { branch: "poonamallee", image: "assets/images/poonamallee/Poonamallee1  (30).jpeg", title: "Poonamallee Campus View 30", description: "Campus night view" },
  { branch: "poonamallee", image: "assets/images/poonamallee/Poonamallee1  (31).jpeg", title: "Poonamallee Campus View 31", description: "Campus night view" },
  { branch: "poonamallee", image: "assets/images/poonamallee/Poonamallee1  (32).jpeg", title: "Poonamallee Campus View 32", description: "Campus night view" },
  { branch: "poonamallee", image: "assets/images/poonamallee/Poonamallee1  (33).jpeg", title: "Poonamallee Campus View 33", description: "Campus night view" },
  { branch: "poonamallee", image: "assets/images/poonamallee/Poonamallee1  (34).jpeg", title: "Poonamallee Campus View 34", description: "Campus night view" },
  { branch: "poonamallee", image: "assets/images/poonamallee/Poonamallee1  (35).jpeg", title: "Poonamallee Campus View 35", description: "Campus night view" },
  { branch: "poonamallee", image: "assets/images/poonamallee/Poonamallee1  (36).jpeg", title: "Poonamallee Campus View 36", description: "Campus night view" },
  { branch: "poonamallee", image: "assets/images/poonamallee/Poonamallee1  (37).jpeg", title: "Poonamallee Campus View 37", description: "Campus night view" },
  { branch: "poonamallee", image: "assets/images/poonamallee/Poonamallee1  (38).jpeg", title: "Poonamallee Campus View 38", description: "Campus night view" },
  { branch: "poonamallee", image: "assets/images/poonamallee/Poonamallee1  (39).jpeg", title: "Poonamallee Campus View 39", description: "Campus night view" },
  { branch: "poonamallee", image: "assets/images/poonamallee/Poonamallee1  (40).jpeg", title: "Poonamallee Campus View 40", description: "Campus night view" },
  { branch: "poonamallee", image: "assets/images/poonamallee/Poonamallee1  (41).jpeg", title: "Poonamallee Campus View 41", description: "Campus night view" },
  { branch: "poonamallee", image: "assets/images/poonamallee/Poonamallee1  (42).jpeg", title: "Poonamallee Campus View 42", description: "Campus night view" },
  { branch: "poonamallee", image: "assets/images/poonamallee/Poonamallee1  (43).jpeg", title: "Poonamallee Campus View 43", description: "Campus night view" },
  { branch: "poonamallee", image: "assets/images/poonamallee/Poonamallee1  (44).jpeg", title: "Poonamallee Campus View 44", description: "Campus night view" },
  { branch: "poonamallee", image: "assets/images/poonamallee/Poonamallee1  (45).jpeg", title: "Poonamallee Campus View 45", description: "Campus night view" },
  { branch: "poonamallee", image: "assets/images/poonamallee/Poonamallee1  (46).jpeg", title: "Poonamallee Campus View 46", description: "Campus night view" },
  { branch: "poonamallee", image: "assets/images/poonamallee/Poonamallee1  (47).jpeg", title: "Poonamallee Campus View 47", description: "Campus night view" },
  { branch: "poonamallee", image: "assets/images/poonamallee/Poonamallee1  (48).jpeg", title: "Poonamallee Campus View 48", description: "Campus night view" },
  { branch: "poonamallee", image: "assets/images/poonamallee/Poonamallee1  (49).jpeg", title: "Poonamallee Campus View 49", description: "Campus night view" },
  { branch: "poonamallee", image: "assets/images/poonamallee/Poonamallee1  (50).jpeg", title: "Poonamallee Campus View 50", description: "Campus night view" },
  { branch: "poonamallee", image: "assets/images/poonamallee/Poonamallee1  (51).jpeg", title: "Poonamallee Campus View 51", description: "Campus night view" },
  { branch: "poonamallee", image: "assets/images/poonamallee/Poonamallee1  (52).jpeg", title: "Poonamallee Campus View 52", description: "Campus night view" },
  { branch: "poonamallee", image: "assets/images/poonamallee/Poonamallee1  (53).jpeg", title: "Poonamallee Campus View 53", description: "Campus night view" },
  { branch: "poonamallee", image: "assets/images/poonamallee/Poonamallee1  (54).jpeg", title: "Poonamallee Campus View 54", description: "Campus night view" },
  { branch: "poonamallee", image: "assets/images/poonamallee/Poonamallee1  (55).jpeg", title: "Poonamallee Campus View 55", description: "Campus night view" },
  { branch: "poonamallee", image: "assets/images/poonamallee/Poonamallee1  (56).jpeg", title: "Poonamallee Campus View 56", description: "Campus night view" },
  { branch: "poonamallee", image: "assets/images/poonamallee/Poonamallee1  (57).jpeg", title: "Poonamallee Campus View 57", description: "Campus night view" },
  { branch: "poonamallee", image: "assets/images/poonamallee/Poonamallee1  (58).jpeg", title: "Poonamallee Campus View 58", description: "Campus night view" },
  { branch: "poonamallee", image: "assets/images/poonamallee/Poonamallee1  (59).jpeg", title: "Poonamallee Campus View 59", description: "Campus night view" },
  { branch: "poonamallee", image: "assets/images/poonamallee/Poonamallee1  (60).jpeg", title: "Poonamallee Campus View 60", description: "Campus night view" },
  { branch: "poonamallee", image: "assets/images/poonamallee/Poonamallee1  (61).jpeg", title: "Poonamallee Campus View 61", description: "Campus night view" },
  { branch: "poonamallee", image: "assets/images/poonamallee/Poonamallee1  (62).jpeg", title: "Poonamallee Campus View 62", description: "Campus night view" },
  { branch: "poonamallee", image: "assets/images/poonamallee/Poonamallee1  (63).jpeg", title: "Poonamallee Campus View 63", description: "Campus night view" },
  { branch: "poonamallee", image: "assets/images/poonamallee/Poonamallee1  (64).jpeg", title: "Poonamallee Campus View 64", description: "Campus night view" },
  { branch: "poonamallee", image: "assets/images/poonamallee/Poonamallee1  (65).jpeg", title: "Poonamallee Campus View 65", description: "Campus night view" },
  { branch: "poonamallee", image: "assets/images/poonamallee/Poonamallee1  (66).jpeg", title: "Poonamallee Campus View 66", description: "Campus night view" },
  { branch: "poonamallee", image: "assets/images/poonamallee/Poonamallee1  (67).jpeg", title: "Poonamallee Campus View 67", description: "Campus night view" },
  { branch: "poonamallee", image: "assets/images/poonamallee/Poonamallee1  (68).jpeg", title: "Poonamallee Campus View 68", description: "Campus night view" },
  { branch: "poonamallee", image: "assets/images/poonamallee/Poonamallee1  (69).jpeg", title: "Poonamallee Campus View 69", description: "Campus night view" },
];

// Gallery images for "All" branch
const defaultGalleryImages = [
  { branch: "all", image: "assets/images/gallery/gallery1.jpeg", title: "Gallery Image", description: "G Care Council" },
  { branch: "all", image: "assets/images/gallery/gallery2.jpeg", title: "Gallery Image", description: "G Care Council" },
  { branch: "all", image: "assets/images/gallery/gallery3.jpeg", title: "Gallery Image", description: "G Care Council" },
  { branch: "all", image: "assets/images/gallery/gallery4.jpeg", title: "Gallery Image", description: "G Care Council" },
  { branch: "all", image: "assets/images/gallery/gallery5.jpeg", title: "Gallery Image", description: "G Care Council" },
  { branch: "all", image: "assets/images/gallery/gallery6.jpg", title: "Gallery Image", description: "G Care Council" },
  { branch: "all", image: "assets/images/gallery/gallery7.jpg", title: "Gallery Image", description: "G Care Council" },
  { branch: "all", image: "assets/images/gallery/gallery8.jpeg", title: "Gallery Image", description: "G Care Council" },
  { branch: "all", image: "assets/images/gallery/gallery9.jpeg", title: "Gallery Image", description: "G Care Council" },
  { branch: "all", image: "assets/images/gallery/gallery10.jpeg", title: "Gallery Image", description: "G Care Council" },
  { branch: "all", image: "assets/images/gallery/gallery11.jpeg", title: "Gallery Image", description: "G Care Council" },
  { branch: "all", image: "assets/images/gallery/gallery12.jpeg", title: "Gallery Image", description: "G Care Council" },
  { branch: "all", image: "assets/images/gallery/gallery13.jpeg", title: "Gallery Image", description: "G Care Council" },
  { branch: "all", image: "assets/images/gallery/gallery14.jpeg", title: "Gallery Image", description: "G Care Council" },
  { branch: "all", image: "assets/images/gallery/gallery15.jpeg", title: "Gallery Image", description: "G Care Council" }
];

document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".gallery-btn");

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      buttons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      const branch = this.getAttribute("data-branch").toLowerCase();
      showGalleryImages(branch);
    });
  });

  showGalleryImages("all");
});

function showGalleryImages(branch) {
  const galleryGrid = document.getElementById("galleryGrid");

  galleryGrid.style.opacity = "0";
  galleryGrid.style.transform = "translateY(18px)";

  setTimeout(() => {
    let filteredImages = [];

    if (branch === "all") {
      filteredImages = defaultGalleryImages;
    } else {
      filteredImages = galleryData.filter((item) => item.branch === branch);
    }

    galleryGrid.innerHTML = "";

    if (!filteredImages.length) {
      galleryGrid.innerHTML = `
        <div class="no-images">
          <h3>No images available</h3>
          <p>No gallery photos are available for this branch right now.</p>
        </div>
      `;
    } else {
      filteredImages.forEach((item, index) => {
        const galleryItem = createGalleryItem(item, index);
        galleryGrid.appendChild(galleryItem);
      });
    }

    setTimeout(() => {
      galleryGrid.style.opacity = "1";
      galleryGrid.style.transform = "translateY(0)";
    }, 60);
  }, 220);
}

function createGalleryItem(item, index) {
  const div = document.createElement("div");
  div.className = "gallery-item";
  div.style.animationDelay = `${index * 0.06}s`;

  div.innerHTML = `
    <img src="${item.image}" alt="${item.title}" onerror="this.src='assets/images/image1.png'">
    <div class="gallery-overlay">
      <h3>${item.title}</h3>
      <p>${item.description}</p>
    </div>
  `;

  return div;
}
const galleryData = [
  // Kanchipuram
  { branch: "kanchipuram", image: "assets/images/images11.jpeg", title: "Kanchipuram Campus", description: "Main building view" },
  { branch: "kanchipuram", image: "assets/images/images12.jpeg", title: "Kanchipuram Facilities", description: "Classroom infrastructure" },
  { branch: "kanchipuram", image: "assets/images/images13.jpeg", title: "Kanchipuram Laboratory", description: "Science lab facilities" },

  // Ennore
  { branch: "ennore", image: "assets/images/images14.jpeg", title: "Ennore Campus", description: "Campus overview" },
  { branch: "ennore", image: "assets/images/images11.jpeg", title: "Ennore Facilities", description: "Training facilities" },
  { branch: "ennore", image: "assets/images/images13.jpeg", title: "Ennore Events", description: "Student activities" },

  // Saalai
  { branch: "saalai", image: "assets/images/images13.jpeg", title: "Saalai Campus", description: "Campus entrance" },
  { branch: "saalai", image: "assets/images/images14.jpeg", title: "Saalai Facilities", description: "Infrastructure" },
  { branch: "saalai", image: "assets/images/images12.jpeg", title: "Saalai Activities", description: "Campus life" },

  // Nagapattinam
  { branch: "nagapattinam", image: "assets/images/images14.jpeg", title: "Nagapattinam Campus", description: "Main campus view" },
  { branch: "nagapattinam", image: "assets/images/images11.jpeg", title: "Nagapattinam Facilities", description: "Modern infrastructure" },
  { branch: "nagapattinam", image: "assets/images/images12.jpeg", title: "Nagapattinam Labs", description: "Advanced laboratories" },

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
  { branch: "thiruvallur", image: "assets/images/thiruvallur/Thiruvallur1.jpeg", title: "Thiruvallur Campus View 1", description: "Main campus entrance" },
  { branch: "thiruvallur", image: "assets/images/thiruvallur/Thiruvallur2.jpeg", title: "Thiruvallur Campus View 2", description: "Academic building" },
  { branch: "thiruvallur", image: "assets/images/thiruvallur/Thiruvallur3.jpeg", title: "Thiruvallur Campus View 3", description: "Library facility" },
  { branch: "thiruvallur", image: "assets/images/thiruvallur/Thiruvallur4.jpeg", title: "Thiruvallur Campus View 4", description: "Computer lab" },
  { branch: "thiruvallur", image: "assets/images/thiruvallur/Thiruvallur5.jpeg", title: "Thiruvallur Campus View 5", description: "Science laboratory" },
  { branch: "thiruvallur", image: "assets/images/thiruvallur/Thiruvallur6.jpeg", title: "Thiruvallur Campus View 6", description: "Classroom facility" },
  { branch: "thiruvallur", image: "assets/images/thiruvallur/Thiruvallur7.jpeg", title: "Thiruvallur Campus View 7", description: "Administrative office" },
  { branch: "thiruvallur", image: "assets/images/thiruvallur/Thiruvallur8.jpeg", title: "Thiruvallur Campus View 8", description: "Student lounge" },
  { branch: "thiruvallur", image: "assets/images/thiruvallur/Thiruvallur9.jpeg", title: "Thiruvallur Campus View 9", description: "Sports ground" },
  { branch: "thiruvallur", image: "assets/images/thiruvallur/Thiruvallur10.jpeg", title: "Thiruvallur Campus View 10", description: "Auditorium" },
  { branch: "thiruvallur", image: "assets/images/thiruvallur/Thiruvallur11.jpeg", title: "Thiruvallur Campus View 11", description: "Cafeteria" },
  { branch: "thiruvallur", image: "assets/images/thiruvallur/Thiruvallur12.jpeg", title: "Thiruvallur Campus View 12", description: "Parking area" },
  { branch: "thiruvallur", image: "assets/images/thiruvallur/Thiruvallur13.jpeg", title: "Thiruvallur Campus View 13", description: "Garden area" },
  { branch: "thiruvallur", image: "assets/images/thiruvallur/Thiruvallur14.jpeg", title: "Thiruvallur Campus View 14", description: "Conference hall" },
  { branch: "thiruvallur", image: "assets/images/thiruvallur/Thiruvallur15.jpeg", title: "Thiruvallur Campus View 15", description: "Workshop facility" },
  { branch: "thiruvallur", image: "assets/images/thiruvallur/Thiruvallur16.jpeg", title: "Thiruvallur Campus View 16", description: "Medical room" },
  { branch: "thiruvallur", image: "assets/images/thiruvallur/Thiruvallur17.jpeg", title: "Thiruvallur Campus View 17", description: "Staff room" },
  { branch: "thiruvallur", image: "assets/images/thiruvallur/Thiruvallur18.jpeg", title: "Thiruvallur Campus View 18", description: "Exhibition hall" },
  { branch: "thiruvallur", image: "assets/images/thiruvallur/Thiruvallur19.jpeg", title: "Thiruvallur Campus View 19", description: "Campus night view" },

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
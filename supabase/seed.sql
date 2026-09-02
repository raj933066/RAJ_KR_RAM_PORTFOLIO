insert into profiles (name, headline, bio, about, email, phone, location, github_url, linkedin_url, github_username, resume_url, profile_image_url, typed_strings)
values ('RAJ KUMAR RAM', 'Full Stack Developer',
  'I''m an engineering student who enjoys turning ideas into fast, accessible software. Most of my work sits in the MERN stack, but the part I like most is problem-solving underneath it.',
  'Seeking a Software Engineering internship where I can contribute to real production systems, learn from experienced engineers, and keep sharpening my DSA and system-design fundamentals.',
  'rajkrram93@gmail.com', '+91 9330664357', 'Howrah, West Bengal, India',
  'https://github.com/raj933066', 'https://www.linkedin.com/in/raj-kumar-ram/', 'raj933066', '/resume.pdf', '/images/hero.jpg',
  '["Full Stack Developer", 2000, "MERN Stack Enthusiast", 2000, "Problem Solver", 2000, "DSA Practitioner", 2000]')
on conflict do nothing;

insert into projects (title, description, technologies, features, image_url, github_url, live_url, display_order) values
('Airbnb Clone', 'A full-stack property rental platform with listing search, booking flow, and host dashboards.', '["React","Node.js","Express","MongoDB"]', '["Property search & filters","Authentication","Booking management","Responsive UI"]', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop', 'https://github.com/raj933066/airbnb-clone', 'https://airbnb-clone-demo.vercel.app', 1),
('TradeZen', 'A modern trading platform for managing and exploring trading activities.', '[]', '[]', null, null, null, 2),
('Blogging Application', 'A full-stack blogging platform where users can create, publish, read, and manage posts.', '[]', '[]', null, null, null, 3),
('Wanderlust', 'A hotel and accommodation listing application.', '[]', '[]', null, null, null, 4);

insert into skills (name, category, proficiency, display_order) values
('C++','Languages',85,1),('JavaScript','Languages',80,2),('HTML','Languages',95,3),('CSS','Languages',90,4),
('React','Frontend',88,5),('Tailwind CSS','Frontend',90,6),('Node.js','Backend',82,7),('Express.js','Backend',82,8),
('MongoDB','Database',80,9),('Git','Tools',88,10),('GitHub','Tools',88,11),('REST API','Concepts',85,12),
('Data Structures','Concepts',85,13),('Algorithms','Concepts',85,14);
insert into education (institution, degree, period, description, display_order) values
('Jalpaiguri Government Engineering College','B.Tech, Electronics & Communication Engineering','2024 - 2028','Focused on data structures, algorithms, and full-stack web development.',1),
('Sunrise (ENG - MED) School','Higher Secondary (Class XII)','2023 - 2024','Science stream with Computer Science as an elective.',2),
('Sunrise (ENG - MED) School','Secondary (Class X)','2022','Built a foundation in mathematics and the sciences.',3);
insert into experience (company, role, period, description, points, display_order) values
('Software Engineering','Open to Internship & Job Opportunities','Present','Open to full-stack and backend roles.','["Currently looking for Software Engineering internship and job opportunities.","Open to remote, hybrid, or on-site roles."]',1),
('JADAVPUR UNIVERSITY','MicroElectronics Technology & VLSI Design Internship','15 Jun - 15 Jul 2026','Gained hands-on experience in MicroElectronics Technology and VLSI Design.','["Gained hands-on experience in MicroElectronics Technology and VLSI Design."]',2),
('GENZ EDUCATE WING','Full-stack Internship','10 Oct - 10 Dec 2025','Gained hands-on experience in full-stack development.','["Gained hands-on experience in full-stack development.","Collaborated with a team on the project."]',3);
insert into certifications (name, issuer, issue_date, certificate_url, display_order) values
('Data Structures and Algorithms in C++','Apna College','May 2025','/images/cppCertificate-1.png',1),
('The Complete Web Development Course','Apna College','August 2025','/images/webdevCertificate-1.png',2),
('Full Stack Development Internship','GENZ EDUCATE WING','10 Oct - 10 Dec 2025','/images/COMPLETITION CERTIFICATE.jpg',3);
insert into achievements (title, description, icon, display_order) values
('Problem Solving','300+ problems solved across LeetCode, Codeforces and various platforms.','code',1),
('Hackathons','Participated in SMART INDIA HACKATHON.','trophy',2),
('Certificates','5+ certifications across web development and data structures.','certificate',3),
('Coding Practice','Consistent daily practice across competitive programming platforms.','streak',4);

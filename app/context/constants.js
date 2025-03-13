// THIS FILE HOLD THE DYNAMIC DATA OF THIS WEBSITE
import noImage from "@/public/backgrounds/card-bg-img.jpg";

// IMAGES FOR WORK PROJECT
import taskVareImg from "@/public/work/taskvare-img.jpg";
import taskVareCoverImg from "@/public/work/taskvare-cover-img.jpg";
import talentVareImg from "@/public/work/talentvare-img.jpg";
import talentVareCoverImg from "@/public/work/talentvare-cover-img.jpg";
import insureMyTripImg from "@/public/work/insure-my-trip-img.jpg";
import insureMyTripCoverImg from "@/public/work/insure-my-trip-cover-img.jpg";
import loadeImg from "@/public/work/loade-img.jpg";
import loadeCoverImg from "@/public/work/loade-cover-img.jpg";
import insureMyHealthImg from "@/public/work/insure-my-health-img.jpg";
import insureMyHealthCoverImg from "@/public/work/insure-my-health-cover-img.jpg";

// IMAGES FOR PERSONAL PROJECT
import promptareImg from "@/public/projects/narrator-img.jpg";
import promptareImgCover from "@/public/projects/promptare-img-cover.jpg";
import webCrawlerImg from "@/public/projects/webCrawler-img.jpg";
import webCrawlerImgCover from "@/public/projects/webCrawler-img-cover.jpg";
import parabotImg from "@/public/projects/parabot-img-cover.webp";
import parabotImgCover from "@/public/projects/Pasted image.png";
import narratorImg from "@/public/projects/webCrawler-img.jpg";
import narratorImgCover from "@/public/projects/preview_2.png";
import queryMindImg from "@/public/projects/queryMind-img.jpg";
import queryMindImgCover from "@/public/projects/queryMind-img-cover.jpg";
import carCallCenterImg from "@/public/projects/aivoice.webp";
import carCallCenterImgCover from "@/public/projects/aivoicecover.webp";

export const caseStudyNotFound = {
  id: 0,
  title: "Case Study Not Found",
  subTitle: "Project Management Tool",
  url: "https://www.taskvare.com/",
  imgSrc: noImage.src,
};

export const workListData = [
  {
    id: 1,
    title: "Health Insurance",
    subTitle: "Insure My Health",
    url: "https://app.yallacompare.com/insurance/uae/en/health/details",
    imgSrc: insureMyHealthImg.src,
    isFeatured: true,
    isLocked: false,
    details: {
      coverImgSrc: insureMyHealthCoverImg.src,
      overview: {
        myRole: "Frontend Design, Development & Integration",
        team: "Muhammad Sufyan Shoaib (Backend)",
        timeline: "Jul 2024 - Aug 2024",
        desc: {
          para1:
            "Traditional healthcare insurance purchasing is often a complex and time-consuming process for both customers and insurance providers. Insure My Health aims to simplify this process by automating key aspects of the insurance journey.",
          para2:
            "By leveraging technology, the platform enhances customer experience and increases operational efficiency for insurance companies.",
        },
      },
      projectDesc: {
        para1:
          "Our team, developed Insure My Health to address these challenges. By combining user-centric design, advanced automation, and robust data management, we aimed to create a seamless and efficient healthcare insurance purchasing experience.",
        // para2:
        //   "TalentVare simplify employee lifecycle management. From pre-boarding to off-boarding, automate tasks, manage paperwork, and ensure policy compliance. Streamline your processes, enhance efficiency, and seamlessly manage employee transitions.",
      },
      problemStatement: {
        para1:
          "Complex and lengthy application forms requiring repetitive data entry. Difficulty understanding policy coverage and benefits. Long wait times for policy issuance and claim processing. Lack of transparency in pricing and coverage options",
        para2:
          "Manual underwriting and policy issuance leading to operational delays. High customer acquisition costs due to inefficient processes. Difficulty in managing claims and providing accurate customer support.",
      },
      solution: {
        para: "Insure My Health incorporates the following features to address the identified problems:",
        list: [
          {
            title: "Intuitive User Interface",
            desc: "A user-friendly platform guides customers through the insurance selection process. Clear and concise information about plans, coverage options, and pricing is presented in an easily understandable format. Interactive tools such as health assessment questionnaires and premium calculators assist customers in making informed decisions.",
          },
          {
            title: "Automated Underwriting and Policy Issuance",
            desc: "Advanced algorithms and data analytics streamline the underwriting process, allowing for real-time risk assessment and instant policy generation. This eliminates manual paperwork and reduces processing time.",
          },
          {
            title: "Seamless Integration",
            desc: "Integration with various healthcare providers and payment gateways ensures a smooth customer experience. Customers can easily compare plans, select the desired coverage, and complete the purchase process securely.",
          },
          {
            title: "Claims Management",
            desc: "The platform incorporates a streamlined claims process with online claim filing, real-time status updates, and automated document verification. This reduces processing time and improves customer satisfaction.",
          },
        ],
      },
      impact: {
        para: "The implementation of Insure My Health has significantly impacted both customers and insurance providers:",
        list: [
          {
            title: "Enhanced Customer Experience",
            desc: "Simplified application process, instant policy issuance, and easy access to information improve customer satisfaction.",
          },
          {
            title: "Increased Efficiency",
            desc: "Automation reduces manual tasks, leading to faster processing times and cost savings for insurance companies.",
          },
          {
            title: "Improved Decision Making",
            desc: "Data-driven insights enable insurance companies to develop tailored products and pricing strategies.",
          },
          {
            title: "Stronger Customer Relationships",
            desc: "Proactive customer support and transparent communication build trust and loyalty.",
          },
        ],
      },
      closingNotes: {
        para1:
          "Insure My Health represents a significant step forward in the healthcare insurance industry. By automating key processes and providing a user-centric experience, the platform empowers customers and streamlines operations for insurance providers.",
        para2:
          "As a developer, I am proud to have contributed to a solution that improves the overall healthcare insurance experience.",
      },
    },
  },
  {
    id: 2,
    title: "Travel Insurance",
    subTitle: "Insure My Trip",
    url: "https://yallacompare.com/uae/en/services/travel-insurance/",
    imgSrc: insureMyTripImg.src,
    isFeatured: true,
    isLocked: false,
    details: {
      coverImgSrc: insureMyTripCoverImg.src,
      overview: {
        myRole: "Frontend Development & Integration",
        team: "Mahmoud Abdelnasser (Design), Salal Yousuf (Backend)",
        timeline: "Jul 2024 - Aug 2024",
        desc: {
          para1:
            "Traditional travel insurance acquisition is often cumbersome for customers and inefficient for providers. Repetitive data entry, limited self-service options, and manual processing lead to frustration and delays.",
          para2:
            "Insure My Trip, a web application, revolutionizes the travel insurance purchase process, streamlining customer experience and boosting operational efficiency.",
        },
      },
      projectDesc: {
        para1:
          "Our team, tackled these challenges by developing a web application with automation at its core. Insure My Trip streamlines the travel insurance purchase experience for both customers and the company.",
      },
      problemStatement: {
        para1:
          "The current travel insurance journey suffers from several bottlenecks, like, repetitive data entry across online forms and phone calls creates frustration and slows down the process.",
        para2:
          "Lack of self-service options for policy amendments and cancellations limits flexibility and convenience. Manual data entry by agents leads to delays and potential inaccuracies in quotes. Uncertainty about final costs due to inaccurate or delayed price quotes.",
        para3:
          "High operational costs incurred through manual processing of applications and queries. Potential loss of customers due to a long and tedious purchase process.",
      },
      solution: {
        para: "Insure My Trip incorporates the following features to address the identified problems:",
        list: [
          {
            title: "Intuitive User Interface",
            desc: "A user-friendly and responsive interface guides customers through the selection process. Easy navigation, clear product descriptions, and interactive tools like coverage calculators simplify plan selection based on individual needs.",
          },
          {
            title: "Automated Underwriting and Policy Issuance",
            desc: "Integration of advanced algorithms and data analytics enables real-time risk assessment, automated premium calculations, and instant policy issuance. Customers receive their digital policy documents electronically without manual intervention.",
          },
          {
            title: "Seamless Payment Integration",
            desc: "The platform supports various payment methods, including credit/debit cards, online banking, and mobile wallets. Secure payment gateways ensure safe and efficient transactions. Customers can manage travel insurance expenses with installment payment options or premium financing. Integrated payment confirmation and receipt generation streamline the purchase process further.",
          },
          {
            title: "Robust Customer Support",
            desc: "AI-powered chatbots offer instant support, guide users through the application, and assist with plan selection. Live chat and call-back options connect customers with human agents for complex inquiries. Additionally, a comprehensive FAQ section, educational resources, and video tutorials empower customers with information about travel insurance and app usage.",
          },
        ],
      },
      impact: {
        para: "The implementation of these features has significantly benefited both customers and the company:",
        list: [
          {
            title: "Enhanced Customer Experience",
            desc: "Streamlined application process, self-service options, and instant policy issuance eliminate frustration and delays.",
          },
          {
            title: "Improved Operational Efficiency",
            desc: "Automation reduces manual processing, lowers operational costs, and frees up resources for other tasks.",
          },
          {
            title: "Increased Customer Satisfaction",
            desc: "Seamless purchasing experience and readily available information promote customer satisfaction and trust.",
          },
          {
            title: "Wider Customer Base",
            desc: "A faster and more accessible process allows the company to attract a broader customer base.",
          },
        ],
      },
      closingNotes: {
        para1:
          "By automating the travel insurance purchase process, Insure My Trip revolutionizes the experience for both customers and the company. It empowers customers with self-service tools and delivers fast, efficient service.",
        para2:
          "As a developer, I am proud to have contributed to a solution that enhances customer satisfaction, improves operational efficiency, and positions Insure My Trip as a leader in the travel insurance landscape.",
      },
    },
  },
  {
    id: 3,
    title: "Logistics and Delivery Ecosystem (LOADe)",
    subTitle: "Fleet Management & Control System",
    url: "https://loade.net/",
    imgSrc: loadeImg.src,
    isFeatured: true,
    isLocked: false,
    details: {
      coverImgSrc: loadeCoverImg.src,
      overview: {
        myRole: "Frontend Development & Integration",
        team: "Shebaan (Design), Maheer (Backend Lead), Abdul Rehman (Backend)",
        timeline: "Oct 2023 - Jan 2024",
        desc: {
          para1:
            "A revolutionary Pakistani startup, established itself as a leading force in tech-enabled logistics and delivery. Their platform offered on-demand booking for businesses requiring transportation and logistics services. However, a specific pain point emerged for clients who needed frequent deliveries to the same locations.",
          para2:
            "This case study explores the development of a new module within the LOADe platform: Fixed Vehicle Orders. This feature addressed the challenge of repetitive bookings and driver assignments for recurring deliveries.",
        },
      },
      projectDesc: {
        para1:
          "LOADe is a pioneering start-up in Pakistan, dedicated to revolutionizing the logistics and delivery sector through the implementation of cutting-edge technology. The company's focus lies in addressing the challenges within the fragmented logistics and delivery landscape, extending from the harbor to end consumers, while also catering to various business verticals seeking comprehensive platform solutions to optimize their operations.",
        para2:
          "The primary objective of LOADe is to mitigate supply-demand challenges across the entire logistics service spectrum and offer a unified platform that minimizes capital expenditure and enhances profitability for businesses.",
      },
      problemStatement: {
        para1:
          "LOADe initially functioned as a ride-hailing app for logistics, similar to Uber or Careem. Businesses could book individual deliveries, but those with frequent or recurring needs faced an inefficient process. Clients requiring deliveries to the same locations multiple times a week or month were forced to create separate requests for each instance.",
        para2:
          "Companies had to repeatedly enter delivery details, wasting valuable time and effort.",
        para3:
          "Each new request resulted in a different driver assignment, requiring repeated instructions and potentially delaying deliveries.",
        para4:
          "Monitoring driver performance and delivery schedules became increasingly cumbersome with numerous individual requests.",
      },
      solution: {
        para: "The Fixed Vehicle Orders module offers companies an alternative booking option specifically designed for recurring deliveries. Key features include:",
        list: [
          {
            title: "Quotation Management",
            desc: "Businesses can create a single quotation outlining the delivery details, such as pickup and drop-off locations, frequency, and timeframes.",
          },
          {
            title: "Dedicated Driver Assignment",
            desc: "With a fixed order, a single driver is assigned for the entire duration of the service. This fosters familiarity with the delivery route and reduces the need for repeated instructions.",
          },
          {
            title: "Driver Change Request",
            desc: "Companies can request a new driver assignment through the LOADe admin panel for unforeseen circumstances.",
          },
          {
            title: "Subscription Model",
            desc: "Businesses can choose between the existing variable order option (individual bookings) or the new fixed vehicle order module.",
          },
          {
            title: "Driver Monitoring",
            desc: "Companies can track driver attendance, check-in/check-out locations, and overall performance.",
          },
          {
            title: "Invoice Generation",
            desc: "LOADe automatically generates invoices based on the chosen subscription type and service consumption. The system supports online payments through IBFT and credit card options.",
          },
          {
            title: "Reporting",
            desc: "Companies receive monthly reports based on their subscription plan, providing valuable insights into their delivery data.",
          },
        ],
      },
      impact: {
        para: "The Fixed Vehicle Orders module has significantly improved the delivery management experience for LOADe's corporate clients. Benefits include:",
        list: [
          {
            title: "Increased Efficiency",
            desc: "Companies save time with reduced booking requirements and streamlined communication with drivers.",
          },
          {
            title: "Improved Consistency",
            desc: "Dedicated driver assignments provide a reliable delivery experience with increased familiarity with routes and client needs.",
          },
          {
            title: "Enhanced Control",
            desc: "Businesses gain greater control over their delivery operations through driver monitoring and flexible driver change requests.",
          },
          {
            title: "Simplified Billing",
            desc: "Automatic invoice generation and online payment options using PayFast to ensure a seamless financial management experience.",
          },
        ],
      },
      closingNotes: {
        para1:
          "The introduction of Fixed Vehicle Orders demonstrates LOADe's commitment to user-centric innovation. This feature empowers companies with recurring delivery needs, enhancing logistical efficiency and customer satisfaction.",
        para2:
          "As a developer, I am proud to have contributed to a solution that directly empowers businesses and strengthens LOADe's position as a leading logistics platform.",
      },
    },
  },
  {
    id: 4,
    title: "TaskVare",
    subTitle: "Project Management Tool",
    url: "https://www.taskvare.com/",
    imgSrc: taskVareImg.src,
    isFeatured: true,
    isLocked: false,
    details: {
      coverImgSrc: taskVareCoverImg.src,
      overview: {
        myRole: "Frontend Development, Research & Integration",
        team: "Shebaan (Design), Maheer (Backend), Noman (Backend)",
        timeline: "Jan 2024 - Feb 2024",
        desc: {
          para1:
            "TaskVare is a web-based project and task management software designed to streamline workflows and boost team productivity. It boasts a user-friendly interface, robust features, and seamless integration with various tools. However, a critical limitation existed for organizations using Azure Active Directory (AAD) for employee data management. TaskVare lacked the ability to access and synchronize employee data directly from AAD, hindering a smooth user experience.",
          para2:
            "This case study explores the collaborative effort undertaken by a development team to bridge this gap. We successfully implemented Azure Active Directory (AAD) syncing functionality within TaskVare, allowing organizations to leverage their existing employee data structure seamlessly.",
        },
      },
      projectDesc: {
        para1:
          "A task management solution designed to streamline work processes and foster seamless teamwork within organizations. With a focus on enhancing productivity and efficiency, TaskVare offers a user-friendly platform that caters to the diverse needs of businesses seeking to optimize their project management workflows.",
        para2:
          "The platform aims to elevate efficiency by 20% and establish itself as a leading force within the industry. TaskVare is committed to collaborating closely with customers and partners to shape the future of work and deliver impactful outcomes.",
      },
      problemStatement: {
        para1:
          "Many organizations rely on Azure Active Directory for centralized user authentication and management. TaskVare, while offering exceptional project management capabilities, lacked integration with AAD. ",
        para2:
          "This meant that organizations using AAD had to manually add employee data to both platforms, creating a time-consuming and error-prone process. Additionally, maintaining data consistency across AAD and TaskVare proved challenging.",
      },
      solution: {
        para: "To achieve our goal, we opted following technologies:",
        list: [
          {
            title: "Azure Graph API",
            desc: "This Microsoft API granted us access to AAD user data, allowing us to retrieve and manipulate employee information programmatically.",
          },
          {
            title: "MSAL Library",
            desc: "The Microsoft Authentication Library (MSAL) facilitated secure authentication between TaskVare and AAD.",
          },
          {
            title: "Two-Way Data Binding",
            desc: "We implemented a two-way data binding mechanism, ensuring that any updates made to employee data within TaskVare automatically reflected in AAD, and vice versa. This eliminated the need for manual data entry and ensured consistency across both platforms.",
          },
        ],
      },
      impact: {
        para: "The successful integration of AAD syncing into TaskVare yielded significant benefits for organizations using the platform:",
        list: [
          {
            title: "Reduced Administrative Burden",
            desc: "Manual data entry for employees was eliminated, saving administrators valuable time and minimizing errors.",
          },
          {
            title: "Enhanced Data Consistency",
            desc: "Two-way data binding ensured that employee data remained consistent across AAD and TaskVare, improving data integrity and reducing the risk of discrepancies.",
          },
          {
            title: "Streamlined User Management",
            desc: "Organizations could leverage their existing AAD user structure for TaskVare, simplifying user provisioning and access control.",
          },
        ],
      },
      closingNotes: {
        para1:
          "This project exemplifies the power of collaboration and technical expertise. By strategically integrating AAD syncing into TaskVare, we empowered organizations to streamline their user management processes and enhance overall efficiency.",
        para2:
          "The success of this project reinforces the importance of staying up-to-date with the latest technologies and adapting software to accommodate evolving user needs. As a developer, I am  proud to have contributed to a solution that directly benefits our users and strengthens TaskVare's position as a leading project management platform.",
      },
    },
  },
  {
    id: 5,
    title: "TalentVare",
    subTitle: "Workforce Management & Onboarding System",
    url: "https://transvare.com/talentvare/",
    imgSrc: talentVareImg.src,
    isFeatured: true,
    isLocked: false,
    details: {
      coverImgSrc: talentVareCoverImg.src,
      overview: {
        myRole: "Frontend Development & Integration",
        team: "Shebaan (Design), Maheer (Backend Lead), Noman Rehman (Backend), Musadiq Shariq (Sr. Frontend)",
        timeline: "Feb 2024 - Feb 2025",
        desc: {
          para1:
            "Talent acquisition is a crucial aspect of any organization's success. Traditional methods can be opaque for candidates and require juggling multiple tools for HR teams. TalentVare, a human resource management and job board platform, tackles these challenges by offering a comprehensive solution.",
          para2:
            "This case study explores how TalentVare empowers both HR professionals and job seekers through a suite of innovative features.",
        },
      },
      projectDesc: {
        para1:
          "Our team, focused on bridging the gap between HR and candidates. We aimed to create a more streamlined and transparent experience for both parties.",
        para2:
          "TalentVare simplify employee lifecycle management. From pre-boarding to off-boarding, automate tasks, manage paperwork, and ensure policy compliance. Streamline your processes, enhance efficiency, and seamlessly manage employee transitions.",
      },
      problemStatement: {
        para1:
          "The job search process often lacks transparency for candidates. They may submit applications with little to no feedback on their status, leading to frustration and uncertainty.",
        para2:
          "Additionally, HR teams frequently rely on multiple software solutions to manage the entire hiring process, creating inefficiency and data silos.",
      },
      solution: {
        para: "TalentVare addresses the identified challenges through the following features:",
        list: [
          {
            title: "Real-Time Application Status",
            desc: "Candidates receive updates on their application progress, eliminating the guesswork and frustration associated with traditional methods.",
          },
          {
            title: "Streamlined Workflow for HR",
            desc: "TalentVare integrates various recruitment functions into a single platform, allowing HR teams to schedule interviews, generate offer letters, manage interview scores, and create approval workflows for offers and interviews. This reduces reliance on multiple software solutions and centralizes data.",
          },
          {
            title: "Candidate Profile Management",
            desc: "Job seekers can create and manage their resumes directly within TalentVare. They can download their customized resumes or upload existing ones, providing flexibility and ease of use.",
          },
        ],
      },
      impact: {
        para: "The implementation of these features has yielded significant benefits for both HR teams and job seekers using TalentVare:",
        list: [
          {
            title: "Improved Candidate Experience",
            desc: "Transparency in the application process fosters trust and reduces anxiety for candidates.",
          },
          {
            title: "Enhanced Efficiency for HR",
            desc: "Centralized features streamline workflows, saving HR teams time and effort. Data consolidation facilitates informed decision-making throughout the recruitment process.",
          },
          {
            title: "Simplified Recruitment Management",
            desc: "TalentVare eliminates the need for juggling various software tools, simplifying recruitment tasks and data management for HR professionals.",
          },
        ],
      },
      closingNotes: {
        para1:
          "By prioritizing transparency and streamlining workflows, TalentVare empowers both HR teams and job seekers.",
        para2:
          "As a developer, I am  proud to have contributed to a solution that  revolutionizes the recruitment process, fostering a more efficient and  positive experience for all stakeholders.",
      },
    },
  },
];

export const projectListData = [
  {
    id: 1,
    title: "ScrapeFlow",
    subTitle: "Workflow Automation & Web Scraping Platform",
    imgSrc: narratorImg.src,
    isFeatured: true,
    isLocked: false,
    details: {
      coverImgSrc: narratorImgCover.src,
      overview: {
        myRole: "Full Stack Developer",
        techUsed: "Next.js, Tailwind, ShadCn, PostgreSQL, Prisma, Stripe, NextAuth.js",
        timeline: "March 2024",
        sourceCode: "https://github.com/ead8/scrapeflow",
        liveUrl: "https://scrapeflow.vercel.app",
        projectDesc: {
          para1: "ScrapeFlow is a powerful SaaS platform that revolutionizes workflow automation with integrated web scraping capabilities. Built on Next.js, it enables users to automate complex data extraction workflows, securely store credentials, manage billing through Stripe integration, and monitor performance through an intuitive interface. The platform features AI-powered scraping capabilities and real-time analytics for comprehensive workflow monitoring.",
          para2: "The primary goal of ScrapeFlow is to simplify web data extraction and automation processes for businesses. By combining modern technologies with user-friendly interfaces, it provides a seamless experience for creating, managing, and monitoring automated scraping workflows while ensuring security and scalability.",
        },
      },
      features: {
        para: "Key features:",
        list: [
          {
            title: "Workflow Automation",
            desc: "Build and execute multi-step workflows with distinct phases and assigned credits, providing granular control over scraping executions.",
          },
          {
            title: "Advanced Web Scraping Tools",
            desc: "Access a comprehensive suite of scraping tools to design customized workflows, supporting automated actions and scheduled executions.",
          },
          {
            title: "Secure Credential Management",
            desc: "Encrypted storage for API keys, tokens, and sensitive information, ensuring secure handling of credentials throughout the platform.",
          },
          {
            title: "Stripe Integration & Analytics",
            desc: "Complete billing system with usage tracking, subscription management, and real-time performance analytics through an intuitive dashboard.",
          },
        ],
      },
    },
  },
  {
    id: 2,
    title: "University Library Management System",
    subTitle: "Advanced Library Management Platform with Admin Panel",
    imgSrc: promptareImg.src,
    isFeatured: true,
    isLocked: false,
    details: {
      coverImgSrc: promptareImgCover.src,
      overview: {
        myRole: "Full Stack Developer",
        techUsed: "Next.js, TypeScript, PostgreSQL, Upstash, ImageKit, Tailwind CSS, Resend",
        timeline: "March 2024",
        sourceCode: "https://github.com/ead8/high-performant-library-managment",
        liveUrl: null,
        projectDesc: {
          para1: "The University Library Management System is a production-grade platform built with Next.js, TypeScript, and PostgreSQL, featuring both public-facing and admin interfaces. It delivers advanced functionalities including automated book borrowing workflows, email reminders, receipt generation, and comprehensive user management, all optimized for real-world scalability.",
          para2: "This system revolutionizes library management by incorporating modern technologies and automated workflows. From seamless authentication to real-time media processing and efficient caching, every aspect is designed for optimal performance and user experience, making it a comprehensive solution for educational institutions.",
        },
      },
      features: {
        para: "Key features:",
        list: [
          {
            title: "Advanced Authentication & User Management",
            desc: "Open-source authentication system with personalized onboarding flows, email notifications, and role-based access control for administrators.",
          },
          {
            title: "Automated Workflows & Notifications",
            desc: "Sophisticated system for book borrowing with automated email reminders, PDF receipt generation, and customized notifications for due dates and account activities.",
          },
          {
            title: "Comprehensive Admin Dashboard",
            desc: "Feature-rich admin panel with analytics, user management, book management, and detailed borrowing records with advanced search and filtering capabilities.",
          },
          {
            title: "Modern Tech Infrastructure",
            desc: "Built with Next.js, TypeScript, and PostgreSQL, featuring Upstash for caching, ImageKit for media processing, and Resend for email communications.",
          },
        ],
      },
    },
  },
  {
    id: 3,
    title: "Food Ordering Platform",
    subTitle: "Modern Food Delivery & Ordering System",
    imgSrc: parabotImg.src,
    isFeatured: true,
    isLocked: false,
    details: {
      coverImgSrc: parabotImgCover.src,
      overview: {
        myRole: "Full Stack Developer",
        techUsed: "React, Next.js, Redux-Toolkit, MongoDB, Next-Auth, Tailwind CSS, Formik, Yup",
        timeline: "March 2024",
        sourceCode: "https://github.com/ead8/food-ordering-project",
        liveUrl: "http://localhost:3000",
        projectDesc: {
          para1: "A comprehensive food ordering web application built as a Single Page Application using React and Next.js. The platform features responsive design with Tailwind CSS, robust state management through Redux-Toolkit, and secure user authentication via Next-Auth. The system includes both customer-facing interfaces and an admin management panel.",
          para2: "Beyond the core functionality, I enhanced the project with advanced features including optimized state management, user-friendly error handling, efficient MongoDB database queries, and a custom order personalization system. The application demonstrates modern web development practices with a focus on user experience and performance.",
        },
      },
      features: {
        para: "Key features:",
        list: [
          {
            title: "Advanced State Management",
            desc: "Implemented Redux-Toolkit for optimized data flow between components, ensuring seamless state updates and improved application performance.",
          },
          {
            title: "User Authentication & Profiles",
            desc: "Secure authentication system using Next-Auth with user profile management and admin panel access control.",
          },
          {
            title: "Order Customization System",
            desc: "Custom-built feature allowing users to personalize their food orders with specific preferences and modifications.",
          },
          {
            title: "Robust Error Handling",
            desc: "Comprehensive error management system with user-friendly notifications and form validation using Formik and Yup.",
          },
        ],
      },
    },
  },
  {
    id: 4,
    title: "Microservice Architecture System",
    subTitle: "Python & Kubernetes Based Distributed System",
    imgSrc: queryMindImg.src,
    isFeatured: true,
    isLocked: false,
    details: {
      coverImgSrc: queryMindImgCover.src,
      overview: {
        myRole: "Backend Developer & DevOps Engineer",
        techUsed: "Python, Flask, MySQL, RabbitMQ, JWT, Kubernetes, Docker",
        timeline: "March 2024",
        sourceCode: "https://github.com/yourusername/python-kubernetes-microservices",
        liveUrl: null,
        projectDesc: {
          para1: "A robust microservices-based system implementing authentication, notification, and file conversion services. The architecture leverages Python and Flask for service development, RabbitMQ for message queuing, and Kubernetes for orchestration. The system demonstrates modern distributed system practices with a focus on scalability and reliability.",
          para2: "The system comprises four key microservices: Auth Service for user authentication, Gateway Service for API routing, Notification Service for email handling, and Converter Service for file operations. Each service is containerized and orchestrated using Kubernetes, ensuring high availability and efficient resource utilization.",
        },
      },
      features: {
        para: "Key features:",
        list: [
          {
            title: "Authentication Service",
            desc: "Handles user authentication with JWT token management and MySQL database integration, running as an independent microservice on port 5000.",
          },
          {
            title: "API Gateway & Routing",
            desc: "Centralized gateway service managing request routing and validation, operating on port 8080 with advanced request handling capabilities.",
          },
          {
            title: "Message Queue System",
            desc: "RabbitMQ implementation for asynchronous communication between services, featuring management interface and persistent storage through Kubernetes PVC.",
          },
          {
            title: "Containerized Deployment",
            desc: "Full Kubernetes deployment configuration with Docker containerization, ensuring scalable and maintainable service architecture.",
          },
        ],
      },
    },
  },
  {
    id: 5,
    title: "AI-Resumify Pro",
    subTitle: "AI-Powered Resume Builder SaaS Platform",
    imgSrc: webCrawlerImg.src,
    isFeatured: true,
    isLocked: false,
    details: {
      coverImgSrc: webCrawlerImgCover.src,
      overview: {
        myRole: "Full Stack Developer",
        techUsed: "Next.js 15, TypeScript, Tailwind CSS, Shadcn UI, React Hook Form, DND Kit, Stripe, OpenAI API, PostgreSQL, Prisma",
        timeline: "March 2024",
        sourceCode: "https://github.com/ead8/AI-Resumify.git",
        liveUrl: null,
        projectDesc: {
          para1: "AI-Resumify Pro is a modern full-stack SaaS application that revolutionizes resume creation through AI-powered content generation. Built with Next.js 15, the platform features a sophisticated multi-step form system, dynamic content management with drag-and-drop capabilities, and seamless subscription handling through Stripe integration.",
          para2: "The application combines cutting-edge technologies to deliver a comprehensive resume building experience. From real-time previews to automated content suggestions powered by OpenAI, every feature is designed to help users create professional resumes efficiently while maintaining a robust and scalable architecture.",
        },
      },
      features: {
        para: "Key features:",
        list: [
          {
            title: "AI-Powered Content Generation",
            desc: "Leverages OpenAI API to provide intelligent content suggestions and professional writing assistance for resume sections.",
          },
          {
            title: "Dynamic Form Management",
            desc: "Multi-step form system with React Hook Form, featuring drag-and-drop section reordering and real-time content preview.",
          },
          {
            title: "Subscription & Storage System",
            desc: "Integrated Stripe payment processing for subscription tiers, with secure file storage using Vercel Blob and PostgreSQL database management.",
          },
          {
            title: "Advanced Export Capabilities",
            desc: "Professional PDF export functionality with mobile-responsive design and auto-save features for seamless resume management.",
          },
        ],
      },
    },
  },
  {
    id: 6,
    title: "LiveKit AI Car Call Centre",
    subTitle: "AI-Powered Automotive Service Assistant",
    imgSrc: carCallCenterImg.src,
    isFeatured: true,
    isLocked: false,
    details: {
      coverImgSrc: carCallCenterImgCover.src,
      overview: {
        myRole: "Full Stack Developer",
        techUsed: "React, Python, LiveKit, OpenAI, SQLite, Vite",
        timeline: "March 2024",
        sourceCode: "https://github.com/ead8/ai-automotive-assistant.git",
        projectDesc: {
          para1: "LiveKit AI Car Call Centre is a modern AI-powered call center application designed specifically for automotive service centers. The system provides a web interface where customers can interact with an AI agent in real-time through voice and text to access vehicle information and receive assistance.",
          para2: "The application combines React frontend with a Python backend, featuring LiveKit for real-time communication, OpenAI for intelligent responses, and SQLite for efficient vehicle data management. The system streamlines automotive service center operations through automated customer support and vehicle information lookup.",
        },
      },
      features: {
        para: "Key features:",
        list: [
          {
            title: "Real-time Communication",
            desc: "Integrated voice and text communication system using LiveKit, enabling seamless interaction between customers and AI agents.",
          },
          {
            title: "Vehicle Management System",
            desc: "Comprehensive vehicle lookup and profile creation system using VIN, with SQLite database for efficient data storage and retrieval.",
          },
          {
            title: "AI-Powered Responses",
            desc: "OpenAI integration for intelligent and context-aware responses, with custom prompts system for automotive-specific interactions.",
          },
          {
            title: "Modern Web Interface",
            desc: "Clean React-based frontend with modal support, providing an intuitive user experience for vehicle searches and support interactions.",
          },
        ],
      },
    },
  }
];

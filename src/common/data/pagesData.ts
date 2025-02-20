import config from 'config';

//User Images
import avatar1 from '../../assets/images/users/avatar-1.jpg';
import avatar2 from '../../assets/images/users/avatar-2.jpg';
import avatar3 from '../../assets/images/users/avatar-3.jpg';
import avatar5 from '../../assets/images/users/avatar-5.jpg';
import avatar4 from '../../assets/images/users/avatar-4.jpg';
import avatar6 from '../../assets/images/users/avatar-6.jpg';
import avatar7 from '../../assets/images/users/avatar-7.jpg';
import avatar8 from '../../assets/images/users/avatar-8.jpg';

const { commonText } = config;
const pricing1 = [
    {
        id: 1,
        type: "Starter",
        rate: 19,
        description: "The perfect way to get started and get used to our tools.",
        projects: 3,
        Customers: 299,
        FTP: 5,
        supportClass: "danger",
        supportClassSymbol: "close",
        storageClass: "danger",
        storageClassSymbol: "close",
        domainClass: "danger",
        domainClassSymbol: "close",
        ribbon: false,
        planButtonClassname: "danger",
        btntxt: "Your Current Plan",
        btnstatus: " disabled ",
        rateYear: "$171",
        delrateYear: "$228",
        limit: "Unlimited"
    },
    {
        id: 2,
        type: "Professional",
        rate: 29,
        description: "Excellent for scalling teams to build culture. Special plan for professional business.",
        projects: 8,
        Customers: 499,
        FTP: 7,
        supportClass: "success",
        supportClassSymbol: "checkbox",
        storageClass: "danger",
        storageClassSymbol: "close",
        domainClass: "danger",
        domainClassSymbol: "close",
        ribbon: false,
        planButtonClassname: "info",
        btntxt: "Change Plan",
        rateYear: "261",
        delrateYear: "348",
        limit: "Unlimited"
    },
    {
        id: 3,
        type: "Enterprise",
        rate: 39,
        description: "This plan is for those who have a team alredy and running a large business.",
        projects: 15,
        Customers: "Unlimited",
        FTP: 12,
        supportClass: "success",
        supportClassSymbol: "checkbox",
        storageClass: "success",
        storageClassSymbol: "checkbox",
        domainClass: "danger",
        domainClassSymbol: "close",
        ribbon: true,
        planButtonClassname: "info",
        btntxt: "Change Plan",
        rateYear: "351",
        delrateYear: "468",
        limit: "35GB"
    },
    {
        id: 4,
        type: "Unlimited",
        rate: 49,
        description: "For most businesses that want to optimize web queries.",
        projects: "Unlimited",
        Customers: "Unlimited",
        FTP: "Unlimited ",
        supportClass: "success",
        supportClassSymbol: "checkbox",
        storageClass: "success",
        storageClassSymbol: "checkbox",
        domainClass: "success",
        domainClassSymbol: "checkbox",
        ribbon: false,
        planButtonClassname: "info",
        btntxt: "Change Plan",
        rateYear: "441",
        delrateYear: "588",
        limit: "Unlimited"
    },
];

const pricing2 = [
    {
        id: 1,
        type: "Basic Plan",
        purpose: "For Startup",
        planIcon: "ri-book-mark-line",
        rate: 19,
        projects: 3,
        Customers: 299,
        FTP: 5,
        supportClass: "danger",
        supportClassSymbol: "close",
        storageClass: "danger",
        storageClassSymbol: "close",
        domainClass: "danger",
        domainClassSymbol: "close",
        ribbon: false,
        planButtonClassname: "soft-success",
        icon: "ri-book-mark-line",
        btntxt: "Sign up free"
    },
    {
        id: 2,
        type: "Pro Business",
        purpose: "Professional plans",
        planIcon: "ri-medal-line",
        rate: 29,
        projects: 15,
        Customers: "unlimited",
        FTP: 12,
        supportClass: "success",
        supportClassSymbol: "checkbox",
        storageClass: "danger",
        storageClassSymbol: "close",
        domainClass: "danger",
        domainClassSymbol: "close",
        ribbon: true,
        planButtonClassname: "success",
        icon: "ri-medal-line",
        btntxt: "Get started"
    },
    {
        id: 3,
        type: "Platinum Plan",
        purpose: "Enterprise Businesses",
        planIcon: "ri-stack-line",
        rate: 39,
        projects: "unlimited",
        Customers: "unlimited",
        FTP: "unlimited",
        supportClass: "success",
        supportClassSymbol: "checkbox",
        storageClass: "success",
        storageClassSymbol: "checkbox",
        domainClass: "success",
        domainClassSymbol: "checkbox",
        ribbon: false,
        planButtonClassname: "soft-success",
        icon: "ri-stack-line",
        btntxt: "Get started"
    },
];

const pricing3 = [
    {
        id: 1,
        type: "Starter",
        purpose: "Starter plans",
        rate: 22,
        users: 1,
        storage: "01",
        domain: "No",
        support: "No",
        ribbon: false
    },
    {
        id: 2,
        type: "Professional",
        purpose: "Professional plans",
        rate: 29,
        users: 3,
        storage: "10",
        domain: "Yes",
        support: "No",
        ribbon: true
    },
    {
        id: 3,
        type: "Enterprise",
        purpose: "Enterprise plans",
        rate: 39,
        users: 3,
        storage: "20",
        domain: "Yes",
        support: "Yes",
        ribbon: true
    },
    {
        id: 4,
        type: "Unlimited",
        purpose: "Unlimited plans",
        rate: 49,
        users: 5,
        storage: "40",
        domain: "Yes",
        support: "Yes",
        ribbon: false
    },
];

const projects = [
    {
        id: 1,
        title: "Chat App Update",
        updatedTime: "2 year Ago",
        badgeText: "Inprogress",
        badgeClass: "warning",
        member: [
            {
                id: 1,
                img: avatar1
            },
            {
                id: 2,
                img: avatar3
            }
        ],
        cardBorderColor: "warning",
        memberName: [
            {
                id: 1,
                memberText: "J"
            }
        ]
    },
    {
        id: 2,
        title: "ABC Project Customization",
        updatedTime: "2 month Ago",
        badgeText: "Progress",
        badgeClass: "primary",
        member: [
            {
                id: 1,
                img: avatar8
            },
            {
                id: 2,
                img: avatar7
            },
            {
                id: 3,
                img: avatar6
            },
        ],
        cardBorderColor: "success",
        memberName: [
            {
                id: 1,
                memberText: "2+"
            }
        ]
    },
    {
        id: 3,
        title: "Client - Frank Hook",
        updatedTime: "1 hr Ago",
        badgeText: "New",
        badgeClass: "info",
        member: [
            {
                id: 1,
                img: avatar4
            },
            {
                id: 2,
                img: avatar3
            },

        ],
        cardBorderColor: "info",
        memberName: [
            {
                id: 1,
                memberText: "M"
            }
        ]
    },
    {
        id: 4,
        title: commonText.PROJECT_NAME + " Project",
        updatedTime: "11 hr Ago",
        badgeText: "Completed",
        badgeClass: "success",
        member: [
            {
                id: 1,
                img: avatar7
            },
            {
                id: 2,
                img: avatar5
            },

        ],
        cardBorderColor: "primary",
    },
    {
        id: 5,
        title: "Brand Logo Design",
        updatedTime: "10 min Ago",
        badgeText: "New",
        badgeClass: "info",
        member: [
            {
                id: 1,
                img: avatar7
            },
            {
                id: 2,
                img: avatar6
            },

        ],
        cardBorderColor: "danger",
        memberName: [
            {
                id: 1,
                memberText: "E"
            }
        ]
    },
    {
        id: 6,
        title: "Chat App",
        updatedTime: "8 hr Ago",
        badgeText: "Inprogress",
        badgeClass: "warning",
        member: [
            {
                id: 1,
                img: avatar3
            },
            {
                id: 2,
                img: avatar8
            },
        ],
        memberName: [
            {
                id: 1,
                memberText: "R"
            }
        ],
        cardBorderColor: "primary"
    },
    {
        id: 7,
        title: "Project Update",
        updatedTime: "48 min Ago",
        badgeText: "Inprogress",
        badgeClass: "warning",
        member: [
            {
                id: 1,
                img: avatar6
            },
            {
                id: 2,
                img: avatar5
            },
            {
                id: 3,
                img: avatar4
            },
        ],
        cardBorderColor: "warning"
    },
    {
        id: 8,
        title: "Client - Jennifer",
        updatedTime: "30 min Ago",
        badgeText: "Process",
        badgeClass: "primary",
        member: [
            {
                id: 1,
                img: avatar1
            }
        ],
        cardBorderColor: "success"
    },
    {
        id: 9,
        title: "Business Template -UI/UX design",
        updatedTime: "7 month Ago",
        badgeText: "Completed",
        badgeClass: "success",
        member: [
            {
                id: 1,
                img: avatar2
            },
            {
                id: 2,
                img: avatar3
            },
            {
                id: 3,
                img: avatar4
            }
        ],
        cardBorderColor: "info",
        memberName: [
            {
                id: 1,
                memberText: "2+"
            }
        ]
    },
    {
        id: 10,
        title: "Update Project",
        updatedTime: "1 month Ago",
        badgeText: "New",
        badgeClass: "info",
        member: [
            {
                id: 1,
                img: avatar7
            }
        ],
        memberName: [
            {
                id: 1,
                memberText: "A"
            }
        ],
        cardBorderColor: "success"
    },
    {
        id: 11,
        title: "Bank Management System",
        updatedTime: "10 month Ago",
        badgeText: "Completed",
        badgeClass: "success",
        member: [
            {
                id: 1,
                img: avatar7
            },
            {
                id: 2,
                img: avatar6
            },
            {
                id: 3,
                img: avatar5
            }
        ],
        cardBorderColor: "danger",
        memberName: [
            {
                id: 1,
                memberText: "2+"
            }
        ]
    },
    {
        id: 12,
        title: "PSD to HTML Convert",
        updatedTime: "29 min Ago",
        badgeText: "New",
        badgeClass: "info",
        member: [
            {
                id: 1,
                img: avatar7
            }
        ],
        cardBorderColor: "primary"
    },

];

const documents = [
    {
        id: 1,
        icon: "ri-file-zip-fill",
        iconBackgroundClass: "primary",
        fileName: "Artboard-documents.zip",
        fileType: "Zip File",
        fileSize: "4.57 MB",
        updatedDate: "12 Dec 2021"
    },
    {
        id: 2,
        icon: "ri-file-pdf-fill",
        iconBackgroundClass: "danger",
        fileName: "Bank Management System",
        fileType: "PDF File",
        fileSize: "8.89 MB",
        updatedDate: "24 Nov 2021"
    },
    {
        id: 3,
        icon: "ri-video-line",
        iconBackgroundClass: "secondary",
        fileName: "Tour-video.mp4",
        fileType: "MP4 File",
        fileSize: "14.62 MB",
        updatedDate: "19 Nov 2021"
    },
    {
        id: 4,
        icon: "ri-file-excel-fill",
        iconBackgroundClass: "secondary",
        fileName: "Tour-video.mp4",
        fileType: "XSL File",
        fileSize: "2.38 KB",
        updatedDate: "14 Nov 2021"
    },
    {
        id: 5,
        icon: "ri-folder-line",
        iconBackgroundClass: "info",
        fileName: "Project Screenshots Collection",
        fileType: "Folder File",
        fileSize: "87.24 MB",
        updatedDate: "08 Nov 2021"
    },
    {
        id: 6,
        icon: "ri-image-2-fill",
        iconBackgroundClass: "danger",
        fileName: commonText.PROJECT_NAME + "-logo.png",
        fileType: "PNG File",
        fileSize: "879 KB",
        updatedDate: "02 Nov 2021"
    },
];

const video = [
    {
        id: 1,
        title: "Admin dashboard templates - Material Design for " + commonText.PROJECT_NAME,
        siteLink: "https://themesbrand.com/velzon/index.html",
        videoLink: "https://www.youtube.com/embed/GfSZtaoc5bw",
        description: commonText.PROJECT_NAME + " admin is super flexible, powerful, clean, modern & responsive admin template based on bootstrap 5 stable with unlimited possibilities. You can simply change to any layout or mode by changing a couple of lines of code. You can start small and large projects or update design in your existing project using " + commonText.PROJECT_NAME + " it is very quick and easy as it is beautiful, adroit, and delivers the ultimate user experience.",
        likes: 335,
        comments: 102,
        auther: "Themesbrand"
    },
    {
        id: 2,
        title: "Create Responsive Admin Dashboard using Html CSS",
        siteLink: "https://themesbrand.com/velzon/index.html",
        videoLink: "https://www.youtube.com/embed/Z-fV2lGKnnU",
        description: commonText.PROJECT_NAME + " admin is super flexible, powerful, clean, modern & responsive admin template based on bootstrap 5 stable with unlimited possibilities. You can simply change to any layout or mode by changing a couple of lines of code. You can start small and large projects or update design in your existing project using " + commonText.PROJECT_NAME + " it is very quick and easy as it is beautiful, adroit, and delivers the ultimate user experience.",
        likes: 485,
        comments: 167,
        auther: "Themesbrand"
    },
    {
        id: 3,
        title: commonText.PROJECT_NAME + " - The Most Popular Bootstrap 5 HTML, Angular & React Js Admin",
        siteLink: "https://themesbrand.com/velzon/index.html",
        videoLink: "https://www.youtube.com/embed/1y_kfWUCFDQ",
        description: commonText.PROJECT_NAME + " admin is super flexible, powerful, clean, modern & responsive admin template based on bootstrap 5 stable with unlimited possibilities. You can simply change to any layout or mode by changing a couple of lines of code. You can start small and large projects or update design in your existing project using " + commonText.PROJECT_NAME + " it is very quick and easy as it is beautiful, adroit, and delivers the ultimate user experience.",
        likes: 122,
        comments: 51,
        auther: "Themesbrand"
    }
];


export { pricing1, pricing2, pricing3, projects, documents, video };
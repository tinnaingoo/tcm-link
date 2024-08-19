document.addEventListener("DOMContentLoaded", function() {
    const langButtons = document.querySelectorAll('.lang-btn');

    // Language content dictionary
    const langContent = {
        en: {
            home: 'Home',
            myWork: 'My Work',
            aboutMe: 'About Me',
            getInTouch: 'Get in Touch',
            blog: 'Blog',
            subscribe: 'Subscribe to Our YouTube Channel',
            searchPlaceholder: 'Search...',
            noResults: 'No results found.',
            copyright: 'Copyright © 2024 TC-Myaing'
        },
        mm: {
            home: 'မူလ',
            myWork: 'ကျွန်ုပ်၏အလုပ်များ',
            aboutMe: 'ကျွန်ုပ်အကြောင်း',
            getInTouch: 'ဆက်သွယ်ရန်',
            blog: 'ဘလော့ဂ်',
            subscribe: 'ကျွန်ုပ်တို့၏ YouTube ချန်နယ် Subscribe လုပ်ပါ',
            searchPlaceholder: 'ရှာဖွေပါ...',
            noResults: 'ရလဒ်များ မတွေ့ပါ။',
            copyright: 'မူပိုင်ခွင့် © 2024 TC-Myaing'
        }
    };

    // Add event listeners to buttons
    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            const lang = this.id.split('-')[1];
            switchLanguage(lang);

            // Toggle active state
            langButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });

    function switchLanguage(lang) {
        document.querySelector('.menu-list li:nth-child(1) a').textContent = langContent[lang].home;
        document.querySelector('.menu-list li:nth-child(2) a').textContent = langContent[lang].myWork;
        document.querySelector('.menu-list li:nth-child(3) a').textContent = langContent[lang].aboutMe;
        document.querySelector('.menu-list li:nth-child(4) a').textContent = langContent[lang].getInTouch;
        document.querySelector('.menu-list li:nth-child(5) a').textContent = langContent[lang].blog;
        document.querySelector('.s-title').textContent = langContent[lang].subscribe;
        document.getElementById('searchBar').placeholder = langContent[lang].searchPlaceholder;
        document.getElementById('noResults').textContent = langContent[lang].noResults;
        document.querySelector('.footer p').textContent = langContent[lang].copyright;
    }

    // Set default language
    switchLanguage('en');
});

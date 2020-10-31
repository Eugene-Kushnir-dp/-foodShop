'use strict';
window.addEventListener('DOMContentLoaded', function() {

    // Tabs
    
	let tabs = document.querySelectorAll('.tabheader__item'),
		tabsContent = document.querySelectorAll('.tabcontent'),
		tabsParent = document.querySelector('.tabheader__items');

	function hideTabContent() {
        
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
	}

	function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }
    
    hideTabContent();
    showTabContent();

	tabsParent.addEventListener('click', function(event) {
		const target = event.target;
		if(target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
		}
    });

    // timer

    const deadTime = '2020-11-1';

    function getTimeRemainining(endTime){
        const t = Date.parse(endTime) - Date.parse(new Date()),
              days = Math.floor(t / (1000*60*60*24)),
              hours = Math.floor((t / (1000*60*60) % 24)),
              minutes = Math.floor((t / (1000*60) % 60)),
              second = Math.floor((t / 1000 % 60));

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'second': second
        };   
    }

        function getZero (num){
            if(num >= 0 && num < 10){
                return `0${num}`;
            } else {
                return num;
            }
        }
    function setClock(selector, endTime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            second = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

            updateClock();

        function updateClock(){
            const t = getTimeRemainining(endTime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours) ;
            minutes.innerHTML = getZero(t.minutes);
            second.innerHTML = getZero(t.second);


            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }    
    }

    setClock('.timer', deadTime);
    
    //modal

    const  modalTrigger = document.querySelectorAll('[data-modal]'),
    modal = document.querySelector('.modal'),
    modalCloseBtn = document.querySelector('[data-close]');

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    modalCloseBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if(e.target === modal) {
            closeModal();
        }
     });

     document.addEventListener('keydown', (e) => {
        if(e.code === "Escape" && modal.classList.contains('show')) {
            closeModal();
        }
     });

     const modalTimerId = setTimeout(openModal, 5000);

     function showModalByScroll() {
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
     }
    
     window.addEventListener('scroll', showModalByScroll);



    //  class menuForDay {
    //      menuImg = document.querySelector('.menu__item img')
    //      menuDesc = document.querySelector()
    //  }

   });
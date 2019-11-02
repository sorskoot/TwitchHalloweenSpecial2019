(function () {
    const $notify = document.getElementById('notifications');
    const timeline = [
        {
            notify: 'Stream started',
            act: () => {
                changeLightOff(1);
            }
        },
/*00:00*/ { time: 10, notify: 'Go Live!' },
/*00:10*/ { time: 10, notify: 'Question of the day' },
/*00:30*/ { time: 20, notify: 'Thanks+follow!' },
/*00:40*/ { time: 10, notify: '30 minutes to go.' },
/*00:50*/ { time: 10, notify: 'Mention bad weater' },
/*01:00*/ { time: 10, notify: '10 minutes to go.' },
/*00:00*/ //Go!!!!
/*01:10*/ { time: 10, notify: 'Knocking 1 - Listen', act: () => sfx('/sfx/Knocking.mp3') },
/*01:16*/ { time: 6, notify: 'Knocking 2 - Listen', act: () => sfx('/sfx/Knocking.mp3') },
/*01:22*/ { time: 6, notify: 'children crying 1 - Listen', act: () => sfx('/sfx/Children03.mp3') },
/*01:35*/ { time: 13, notify: 'children crying 2 - Listen', act: () => sfx('/sfx/Children01.mp3') },
/*01:43*/ { time: 8, notify: 'children crying 3 - WebCam 4s - RGB - Listen', act: () => sfx('/sfx/Children02.mp3') },
/*01:47*/ { time: 4, notify: 'children crying 4 - WebCam 7s - Noise - Leave to watch!', act: () => sfx('/sfx/Children04.mp3') },
/*01:53*/ { time: 6, notify: 'Knocking', act: () => sfx('/sfx/Knocking.mp3') },
/*01:53*/ { time: .1, notify: 'Door opens, switch to "Shadow" (7.5s delay)', act: () => changeLightOn().then(() => changeLightBri(250, 10)) },
/*01:54*/ { time: 1, notify: 'Knocking extra', act: () => sfx('/sfx/Knocking.mp3') },
/*01:54*/ { time: .1, notify: 'Start Ghost sequence (check family)' },
/*01:54*/ { time: .5, notify: 'Knocking', act: () => sfx('/sfx/Knocking.mp3') },
/*01:55*/ { time: 1, notify: 'Knocking extra', act: () => sfx('/sfx/Knocking.mp3') },
/*01:56*/ { time: 1, notify: 'Knocking extra', act: () => sfx('/sfx/Knocking.mp3') },

    ]
    let currentStep = 0;

    next(timeline[currentStep]);

    function next() {
        notify(timeline[currentStep].notify);
        if (!!timeline[currentStep].act) {
            timeline[currentStep].act();
        }

        currentStep++;
        if (!!timeline[currentStep]) {
            setTimeout(
                () => next(timeline[currentStep]),
                timeline[currentStep].time * 1000 * 60);
        }
    }

    function notify(string) {
        let $div = document.createElement('div');
        let $time = document.createElement('span');
        $time.innerText = new Date().toTimeString().slice(0, 8);
        $time.classList.add('time');
        $div.appendChild($time);
        let $note = document.createElement('span');
        $note.innerText = string;
        $div.appendChild($note);
        $notify.prepend($div)
    }

    function sfx(file) {
        var audio = new Audio(file);
        audio.volume = 0.075;
        audio.play();
    }

    function changeLightOff(transitiontime = 10, lightId = 17) {
        const state = {
            on: false,
            transitiontime: transitiontime
        };
        return callLight(state, lightId);
    }

    function changeLightOn(transitiontime = 10, lightId = 17) {
        const state = {
            on: true,
            transitiontime: transitiontime
        };
        return callLight(state, lightId);
    }
    function changeLightBri(bri, transitiontime = 10, lightId = 17) {
        const state = {
            bri: bri,
            transitiontime: transitiontime
        };
        return callLight(state, lightId);
    }

    function callLight(state, lightId = 17) {
        return new Promise((res, rej) =>
            fetch(`http://192.168.1.231/api/EBG79AgVE0NYYntzMd6Gg5Vk6Cyqh57YEK5alROa/lights/${lightId}/state`, {
                method: "PUT",
                body: JSON.stringify(state)
            }).then(response => response.json()
                .then(body => res(body))
            ));
    }

})();
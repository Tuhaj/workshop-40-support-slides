(function (root) {
    'use strict';

    const ONE_SECOND = 1000;
    const ENABLE_ODOMETER = true;
    const ENABLE_RANDOMIZER = false;

    function rand(from = ONE_SECOND * 2, to = ONE_SECOND * 4) {
        return Math.random() * (to - from) + from;
    }

    function render($element, number) {
        if (!ENABLE_ODOMETER) {
            $element.innerText = number;
            return;
        }

        const od = new Odometer({
            el: $element,
            value: 0
        });

        od.update(number);
    }

    function renderAll($numbers, number) {
        $numbers.forEach(($element) => {
            render($element, number);
        });
    }

    function randomizer($numbers) {
        const delay = ~~rand();
        const value = ~~(delay / 100);
        console.info('[randomizer] value', value);
        renderAll($numbers, value);
    }

    function setup() {
        const $numbers = [...root.document.querySelectorAll('.js-workshop-number')];
        const number = root.WORKSHOP_NUMBER;

        if (!number) {
            console.warn('[setup] Nie jest ustawiony numer warsztatu');
            return;
        }

        renderAll($numbers, number);

        if (ENABLE_RANDOMIZER) {
            setInterval(() => randomizer($numbers), ONE_SECOND * 3);
        }
    }

    // Go go go!!!1
    root.addEventListener('load', () => setTimeout(setup, ONE_SECOND / 4));
})(this);

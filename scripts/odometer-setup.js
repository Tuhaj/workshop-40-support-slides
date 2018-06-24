const WORKSHOP_NUMBER = 21;

(function (root) {
    'use strict';

    const doc = root.document;
    let $numbers = null;

    function rand(from = 2000, to = 4000) {
        return Math.random() * (to - from) + from;
    }

    function render($element, number) {
        const od = new Odometer({
            el: $element,
            value: 0
        });

        od.update(number);
    }

    function renderAll(number) {
        $numbers.forEach(($element) => {
            render($element, number);
        });
    }

    function update() {
        const delay = ~~rand();

        root.setTimeout(() => {
            renderAll(~~(delay / 100));
            update();
        }, delay);
    }

    function setup() {
        $numbers = Array.from(doc.querySelectorAll('.js-workshop-number'));
        renderAll(WORKSHOP_NUMBER);
        update();
    }

    // Go go go!!!1
    root.addEventListener('load', () => setTimeout(setup, 1000));
})(this);

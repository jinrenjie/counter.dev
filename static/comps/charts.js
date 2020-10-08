customElements.define('counter-time',
    class extends HTMLElement {
        constructor() {
            super()
        }

        makeGradient(alpha1, alpha2) {
            alpha1 = (typeof alpha1 !== 'undefined') ? alpha1 : 0.6;
            alpha2 = (typeof alpha2 !== 'undefined') ? alpha2 : 1;
            var ctx = this.canvas.getContext("2d")
            var gradientStroke = ctx.createLinearGradient(0, 0, 0, 200);
            gradientStroke.addColorStop(0, "rgba(30, 135, 240, " + alpha1 + ")");
            gradientStroke.addColorStop(1, "rgba(30, 135, 240, " + alpha2 + ")");
            return gradientStroke
        }


        set entries(entries) {
            this.innerHTML = "<canvas></canvas>"
            this.canvas = this.children[0]

            var sumHours = function(arr) {
                var sum = 0
                arr.forEach(el => sum += (entries[el] || 0))
                return sum
            }

            new Chart(this.canvas, {
                type: 'bar',
                data: {
                    labels: [
                        'Morning',
                        'Afternoon',
                        'Evening',
                        'Night',
                    ],
                    datasets: [{
                        maxBarThickness: 10,
                        data: emptyIfSumZero([
                            sumHours([5, 6, 7, 8, 9, 10, 11]),
                            sumHours([12, 13, 14, 15]),
                            sumHours([16, 17, 18, 19, 20, 21]),
                            sumHours([22, 23, 24, 0, 1, 2, 3, 4]),
                        ]),
                        backgroundColor: this.makeGradient(),
                    }, ],
                },
                options: {
                    tooltips: {
                        mode: 'index'
                    },
                    legend: {
                        display: false,
                    },
                    title: {
                        display: true,
                        text: "Visits by time",
                        position: "top",
                    },
                    scales: {
                        yAxes: [{
                            gridLines: {
                                display: false,
                            },
                            ticks: {
                                display: false,
                                beginAtZero: true,
                            }
                        }, ],
                        xAxes: [{
                            gridLines: {
                                display: false,
                            },
                            ticks: {
                                beginAtZero: true,
                            }
                        }, ],
                    },
                },
            })
        }

    }
)



customElements.define('counter-weekday',
    class extends HTMLElement {
        constructor() {
            super()
        }

        makeGradient(alpha1, alpha2) {
            alpha1 = (typeof alpha1 !== 'undefined') ? alpha1 : 0.6;
            alpha2 = (typeof alpha2 !== 'undefined') ? alpha2 : 1;
            var ctx = this.canvas.getContext("2d")
            var gradientStroke = ctx.createLinearGradient(0, 0, 0, 200);
            gradientStroke.addColorStop(0, "rgba(30, 135, 240, " + alpha1 + ")");
            gradientStroke.addColorStop(1, "rgba(30, 135, 240, " + alpha2 + ")");
            return gradientStroke
        }


        set entries(entries) {
            this.innerHTML = "<canvas></canvas>"
            this.canvas = this.children[0]

            new Chart(this.canvas, {
                type: 'radar',
                data: {
                    labels: ['Mo.', 'Tu.', 'We.', 'Th.', 'Fr.', 'Sa.', 'Su.'],
                    datasets: [{
                        data: emptyIfSumZero([
                            entries[0] || 0,
                            entries[1] || 0,
                            entries[2] || 0,
                            entries[3] || 0,
                            entries[4] || 0,
                            entries[5] || 0,
                            entries[6] || 0,
                        ]),
                        backgroundColor: this.makeGradient(),
                        borderWidth: 1,
                        borderColor: 'transparent',
                        pointBackgroundColor: 'white',
                        pointRadius: 3,
                        pointBorderColor: orange,
                        lineTension: 0.4,
                    }, ],
                },
                options: {
                    title: {
                        display: true,
                        text: 'Visits by weekday',
                        position: "top",
                    },
                    tooltips: {
                        mode: 'index'
                    },
                    legend: {
                        display: false
                    },
                    scale: {
                        gridLines: {
                            display: true,
                            circular: true
                        },
                        ticks: {
                            display: false,
                        }
                    },
                },
            })
        }
    })

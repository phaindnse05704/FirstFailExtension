const POMODORO_STATES = {
    WORK: 'WORK',
    REST: 'REST'
};
const WORKING_TIME_LENGTH_IN_MINUTES = 50;
const RESTING_TIME_LENGTH_IN_MINUTES = 10;
var interval;
var app = {
    el: $("#app>h5"),
    btn: $("#app>button"),
    minute: WORKING_TIME_LENGTH_IN_MINUTES,
    second: 0,
    pomodoroState: POMODORO_STATES.WORK,
    timestamp: 0,
    min: function() {
        if (this.minute < 10) {
            return '0' + this.minute;
        }
        return this.minute;
    },
    sec: function() {
        if (this.second < 10) {
            return '0' + this.second;
        }
        return this.second;
    },
    _tick: function() {
        if (this.second !== 0) {
            this.second--;
            $(this.el).text(this.pomodoroState + ' in ' + this.min() + ':' + this.sec());
            return;
        }
        if (this.minute !== 0) {
            this.minute--;
            this.second = 59;
            $(this.el).text(this.pomodoroState + ' in ' + this.min() + ':' + this.sec());
            return;
        }
        //toggle working/resting intervals
        this.pomodoroState = this.pomodoroState ===
            POMODORO_STATES.WORK ? POMODORO_STATES.REST :
            POMODORO_STATES.WORK;
        if (this.pomodoroState === POMODORO_STATES.WORK) {
            $(this.el).toggleClass("text-danger");
            $(this.el).toggleClass("text-success");
            $(this.el).text(this.pomodoroState + ' in ' + this.min() + ':' + this.sec());
            this.minute = WORKING_TIME_LENGTH_IN_MINUTES;
        } else {
            $(this.el).toggleClass("text-danger");
            $(this.el).toggleClass("text-success");
            $(this.el).text(this.pomodoroState + ' in ' + this.min() + ':' + this.sec());
            this.minute = RESTING_TIME_LENGTH_IN_MINUTES;
        }
        console.log(this.el);

    }
};

function start() {
    app._tick();
    interval = setInterval(() => {
        app._tick();
    }, 1000);
}

function stop() {
    clearInterval(interval);
}
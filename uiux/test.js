// Create Countdown
var Countdown = {
  // Backbone-like structure
  $el: $(".countdown"),
  // Params

  countdown_interval: null,
  total_seconds: 0,

  // Initialize the countdown
  init: function () {
    // DOM
    this.$ = {
      minutes: this.$el.find(".bloc-time.min .figure"),
      seconds: this.$el.find(".bloc-time.sec .figure"),
    };
    // Init countdown values
    this.values = {
      minutes: this.$.minutes.parent().attr("data-init-value"),
      seconds: this.$.seconds.parent().attr("data-init-value"),
    };
    // Initialize total seconds
    this.total_seconds =
      this.values.minutes * 60 + parseInt(this.values.seconds);
    //console.log(this.total_seconds);
    // Animate countdown to the end
    this.count();
  },

  count: function () {
    var that = this,
      $min_1 = this.$.minutes.eq(0),
      $min_2 = this.$.minutes.eq(1),
      $sec_1 = this.$.seconds.eq(0),
      $sec_2 = this.$.seconds.eq(1);

    this.countdown_interval = setInterval(function () {
      if (that.total_seconds > 0) {
        --that.values.seconds;

        if (that.values.minutes >= 0 && that.values.seconds < 0) {
          that.values.seconds = 59;
          --that.values.minutes;
        }
        // Minutes
        that.checkHour(that.values.minutes, $min_1, $min_2);

        // Seconds
        that.checkHour(that.values.seconds, $sec_1, $sec_2);

        --that.total_seconds;
        // console.log(that.total_seconds);
      } else {
        // khi het thoi gian thi lam gi do....
        clearInterval(that.countdown_interval);
      }
    }, 1000);
  },

  animateFigure: function ($el, value) {
    var that = this,
      $top = $el.find(".top-time"),
      $bottom = $el.find(".bottom-time"),
      $back_top = $el.find(".top-back"),
      $back_bottom = $el.find(".bottom-back");

    // Before we begin, change the back value
    $back_top.find("span").html(value);

    // Also change the back bottom value
    $back_bottom.find("span").html(value);

    // Then animate
    TweenMax.to($top, 0.8, {
      rotationX: "-180deg",
      transformPerspective: 300,
      ease: Quart.easeOut,
      onComplete: function () {
        $top.html(value);

        $bottom.html(value);

        TweenMax.set($top, { rotationX: 0 });
      },
    });

    TweenMax.to($back_top, 0.8, {
      rotationX: 0,
      transformPerspective: 300,
      ease: Quart.easeOut,
      clearProps: "all",
    });
  },

  checkHour: function (value, $el_1, $el_2) {
    var val_1 = ("" + value).toString().charAt(0),
      val_2 = ("" + value).toString().charAt(1),
      fig_1_value = $el_1.find(".top-time").html(),
      fig_2_value = $el_2.find(".top-time").html();

    if (value >= 10) {
      // Animate only if the figure has changed
      if (fig_1_value !== val_1) this.animateFigure($el_1, val_1);
      if (fig_2_value !== val_2) this.animateFigure($el_2, val_2);
    } else {
      // If we are under 10, replace first figure with 0
      if (fig_1_value !== "0") this.animateFigure($el_1, 0);
      if (fig_2_value !== val_1) this.animateFigure($el_2, val_1);
    }
  },
};

// Let's go !
// Countdown.init();

function startCountDown() {
  Countdown.init();

  var listContent = [
    "Thấp thoáng ánh mắt đôi môi mang theo hương mê say. Em cho anh tan trong miên man quên luôn đi đêm ngày. Chạm nhẹ vội vàng hai ba giây nhưng con tim đâu hay. Bối rối khẽ lên ngôi yêu thương đong đầy thật đầy",
    "Có câu ca trong gió hát ngân nga ru trời mây. Nhẹ nhàng đón ban mai ngang qua trao nụ cười. Nắng đua chen khoe sắc vui đùa giữa muôn ngàn hoa. Dịu dàng đến nhân gian âu yếm tâm hồn người",
    "Chắc gì nữa mà chắc. Sáng thì nhớ đêm trắng tương tư còn không phải yêu là gì. Rồi thắc gì nữa mà mắc. Đến bên nắm tay nói ra ngay ngồi mơ mộng thêm làm gì. Nhanh chân chạy mua một bó hoa. Thêm luôn một món quà. Khuôn mặt tươi cười lên vô tư gạt đi lo âu mạnh mẽ nha. Và rồi bước ra, bước ra, bước ra...",
  ];

  var r = Math.floor(Math.random() * 3);

  document.getElementById("test-text-render").innerText = listContent[r];
}

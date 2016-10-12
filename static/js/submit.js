$(document).ready(function() {
  function n(n, t, i, r) {
    $("#errMsg").text(r);
    n.parent().siblings(".common-icon").removeClass(i).addClass(t)
  }

  function t() {
    var t = $("#Mobile");
    return(t.val($.trim(t.val())), $.trim(t.val()).length < 1) ? (n(t, "wrong_hint", "true_hint", "*手机号不能为空"), !1) : e.test($.trim(t.val())) ? (n(t, "true_hint", "wrong_hint", ""), !0) : (n(t, "wrong_hint", "true_hint", "*请输入正确的手机号码"), !1)
  }

  function i() {
    var t = $("#SmsValidateCode");
    return $.trim(t.val()).length < 1 ? (n(t, "wrong_hint", "true_hint", "*动态验证码不能为空"), !1) : (n(t, "true_hint", "wrong_hint", ""), !0)
  }

  function r() {
    var i = !1,
      t = $("#ImgValidateCode");
    return $.trim(t.val()).length < 1 ? (n(t, "wrong_hint", "true_hint", "*图片验证码不能为空"), i = !1) : f(jQuery.acSiteUrl + "/registercheck?callback=?", {
          name: "imgvalidatecode",
          value: t.val()
        },
        function(r) {
          r.Code != 1 ? (n(t, "wrong_hint", "true_hint", r.Message), i = !1) : (n(t, "true_hint", "wrong_hint", ""), i = !0)
        }),
      i
  }
  var u;
  jQuery.acSiteUrl = "https://ac.ppdai.com";
  var f = function(n, t, i, r, u) {
      jQuery.isFunction(t) && (r = r || i, i = t, t = undefined);
      $.ajax({
        async: !1,
        type: u || "GET",
        url: n,
        data: t,
        success: i,
        dataType: "json"
      })
    },
    o = function(n) {
      var i = new RegExp("(^|&)" + n + "=([^&]*)(&|$)", "i"),
        t = window.location.search.substr(1).match(i);
      return t != null ? decodeURIComponent(t[2]) : null
    },
    e = /^(13|14|15|17|18)[0-9]{9}$/;
  $("#Mobile").blur(function() {
    t()
  });
  $("#SmsValidateCode").blur(function() {
    i()
  });
  $("#ImgValidateCode").blur(function() {
    r()
  });
  $("#btnSendSms").click(function() {
    t() && r() && (acUtils.remainTime($(this), 60, null, "秒再发送", "reg_mobile_remainTime", {
      expires: 1 / 1440,
      path: "/",
      domain: ".ac.ppdai.com",
      secure: !1
    }), u($("#Mobile").val(), $("#ImgValidateCode").val()))
  });
  jQuery.cookie("reg_mobile_remainTime") && jQuery.cookie("reg_mobile_remainTime").length > 0 && acUtils.remainTime("#btnSendSms", jQuery.cookie("reg_mobile_remainTime"), null, "秒再发送", "reg_mobile_remainTime", {
    expires: 1 / 1440,
    path: "/",
    domain: ".ac.ppdai.com",
    secure: !1
  });
  u = function(n, t) {
    var i = jQuery.acSiteUrl + "/ActivityPage/SmsLoginOrRegisteSendCode?Mobile=" + n + "&ImgValidateCode=" + t + "&ver=1&callback=?";
    $.getJSON(i, {},
      function(n) {
        !n.Code == 1 && (alert(n.Message), $("#imgCode").click())
      })
  };
  $("#btnSubmit").click(function() {
    var n, r, u, f, e;
    if(!t() || !i()) return !1;
    n = $(this);
    n.val("正在提交中...").attr("disabled", "disabled");
    r = $("#Redirect").val();
    r == undefined && (r = "");
    u = $("#WeixinCode").val();
    u == undefined && (u = "");
    f = $("#WeixinFailRedirect").val();
    f == undefined && (f = "");
    e = {
      ActivityID: $("#ActivityID").val(),
      Mobile: $.trim($("#Mobile").val()),
      SmsValidateCode: $("#SmsValidateCode").val(),
      UserRole: $("#UserRole").val(),
      Redirect: r,
      WeixinCode: u,
      WeixinFailRedirect: f
    };
    $.post("/ActivityPage/Index", e,
      function(t) {
        t.Code == 1 ? (n.val("登录成功, 跳转中..."), self == top ? window.location.href = t.Content.Redirect : top.location.href = t.Content.Redirect) : t.Code == -100 ? (alert(t.Message), self == top ? window.location.href = t.Content.WeixinFailRedirect : top.location.href = t.Content.WeixinFailRedirect) : (n.val("立即借款").attr("disabled", !1), $("#errMsg").text(t.Message))
      })
  })
})
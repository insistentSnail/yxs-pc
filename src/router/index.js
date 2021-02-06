import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home", //首页
    component: () => import("../views/Home.vue"),
    meta: {
      headerShow: true,
      footerShow: true
    }
  },
  {
    path: "/elective",
    name: "ELective", //选课中心
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/Elective.vue"),
    meta: {
      headerShow: true,
      footerShow: true,
      keepAlive: true
    }
  },
  {
    path: "/questionBank",
    name: "QuestionBank", //题库
    component: () => import("../views/QuestionBank/index.vue"),
    meta: {
      headerShow: true,
      footerShow: true
    }
  },
  {
    path: "/examState",
    name: "ExamState", //考试动态
    component: () => import("../views/ExamState/index.vue"),
    meta: {
      headerShow: true,
      footerShow: true
    }
  },
  {
    path: "/networkSchool",
    name: "NetworkSchool", //网校优势
    component: () => import("../views/NetworkSchool/index.vue"),
    meta: {
      headerShow: true,
      footerShow: true
    }
  },
  {
    path: "/aboutUs",
    name: "AboutUs", //关于我们
    component: () => import("../views/AboutUs/index.vue"),
    meta: {
      headerShow: true,
      footerShow: true
    }
  },
  {
    path: "/yszc",
    name: "Yszc", //隐私条款
    component: () => import("../views/yszc/index.vue"),
    meta: {
      headerShow: true,
      footerShow: true
    }
  },
  {
    path: "/yhxy",
    name: "Yhxy", //用户协议
    component: () => import("../views/yhxy/index.vue"),
    meta: {
      headerShow: true,
      footerShow: true
    }
  },
  {
    path: "/guide",
    name: "Guide", //报考指南
    component: () => import("../views/Guide/index.vue"),
    meta: {
      headerShow: true,
      footerShow: true
    }
  },
  {
    path: "/help",
    name: "Help", //帮助中心
    component: () => import("../views/help/index.vue"),
    meta: {
      footerShow: true
    }
  },
  {
    path: "/message",
    name: "Message", //留言反馈
    component: () => import("../views/Message/index.vue"),
    meta: {
      footerShow: true
    }
  },
  {
    path: "/examInfo",
    name: "ExamInfo", //考试动态详情
    component: () => import("../views/ExamState/info.vue"),
    meta: {
      headerShow: true,
      footerShow: true
    }
  },
  {
    path: "/questionBank/errorQuestion",
    name: "ErrorQuestion", //错题集
    component: () => import("../views/QuestionBank/errorQuestion.vue"),
    meta: {
      headerShow: true,
      footerShow: true
    }
  },
  {
    path: "/questionBank/practice",
    name: "Practice", //练习
    component: () => import("../views/QuestionBank/practice.vue"),
    meta: {
      headerShow: true,
      footerShow: true
    }
  },
  {
    path: "/questionBank/specialPractice",
    name: "SpecialPractice", //专项练习
    component: () => import("../views/QuestionBank/specialPractice.vue"),
    meta: {
      headerShow: true,
      footerShow: true
    }
  },
  {
    path: "/questionBank/exam",
    name: "Exam", //考试
    component: () => import("../views/QuestionBank/exam.vue"),
    meta: {
      headerShow: true,
      footerShow: true
    }
  },
  {
    path: "/questionBank/examResult",
    name: "ExamResult", //考试结果
    component: () => import("../views/QuestionBank/examResult.vue"),
    meta: {
      headerShow: true,
      footerShow: true
    }
  },
  {
    path: "/class/:id",
    name: "Class", //班级详情
    component: () => import("../views/Class/index.vue"),
    meta: {
      headerShow: true,
      footerShow: true
    }
  },
  {
    path: "/course/:id", //防止刷新页面参数消失
    name: "Course", //课程详情
    component: () => import("../views/Course/index.vue"),
    meta: {
      headerShow: true,
      footerShow: true
    }
  },
  {
    path: "/fullScreen",
    name: "FullScreen", //课程播放
    component: () => import("../views/Course/FullScreen.vue"),
    meta: {}
  },
  {
    path: "/login",
    name: "Login", //登录
    component: () => import("../views/Login/index.vue"),
    meta: {
      footerShow: true
    }
  },
  {
    path: "/userCenter",
    name: "UserCenter", //用户中心
    redirect: "/userCenter/home",
    component: () => import("../views/UserCenter/index.vue"),
    meta: {
      footerShow: true,
      keepAlive: true
    },

    children: [
      {
        path: "home",
        name: "UserCenterHome",
        component: () => import("../views/UserCenter/Home/index.vue"),
        meta: {
          footerShow: true,
          keepAlive: true
        }
      },
      {
        path: "course",
        name: "UserCenterCourse",
        component: () => import("../views/UserCenter/Course/index.vue"),
        meta: {
          footerShow: true,
          keepAlive: true
        }
      },
      {
        path: "class",
        name: "UserCenterClass",
        component: () => import("../views/UserCenter/Class/index.vue"),
        meta: {
          footerShow: true,
          keepAlive: true
        }
      },
      {
        path: "record",
        name: "UserCenterRecord",
        component: () => import("../views/UserCenter/Record/index.vue"),
        meta: {
          footerShow: true,
          keepAlive: true
        }
      },
      {
        path: "data",
        name: "UserCenterData",
        component: () => import("../views/UserCenter/Data/index.vue"),
        meta: {
          footerShow: true,
          keepAlive: true
        }
      },
      {
        path: "order",
        name: "UserCenterOrder",
        component: () => import("../views/UserCenter/Order/index.vue"),
        meta: {
          footerShow: true,
          keepAlive: true
        }
      },
      {
        //开始做题
        path: "exercise",
        name: "UserCenterExercise",
        component: () => import("../views/UserCenter/Exercise/index.vue"),
        meta: {
          footerShow: true,
          keepAlive: true
        }
      },
      {
        //做题记录
        path: "practiceRecord",
        name: "UserCenterPracticeRecord",
        component: () => import("../views/UserCenter/PracticeRecord/index.vue"),
        meta: {
          footerShow: true,
          keepAlive: true
        }
      },
      {
        //考试记录
        path: "examRecord",
        name: "UserCenterExamRecord",
        component: () => import("../views/UserCenter/ExamRecord/index.vue"),
        meta: {
          footerShow: true,
          keepAlive: true
        }
      },
      {
        //错题收藏
        path: "collect",
        name: "UserCenterCollect",
        component: () => import("../views/UserCenter/Collect/index.vue"),
        meta: {
          footerShow: true,
          keepAlive: true
        }
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;

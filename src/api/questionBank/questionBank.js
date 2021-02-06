import request from "@/api/request";
// 章节和专项练习列表
export function chapterList(data) {
  return request({
    url: "/question/api/answerRecord/getChapterInfo",
    method: "get",
    headers: {
      "train-code": data.code
    },
    data
  });
}
// 展开章节列表
export function openChapterList(data) {
  return request({
    url: "/question/api/answerRecord/lessonInfo",
    method: "get",
    data
  });
}
// 专项练习点击开始做题弹窗
export function specialList(data) {
  return request({
    url: "/question/api/answerRecord/getSubjectExercisesParam",
    method: "get",
    data
  });
}
// 专项练习跳转练习题页面
export function specialQuestions(data) {
  return request({
    url: "/question/api/answerRecord/getSubjectExercises",
    method: "get",
    data
  });
}
// 历年真题和模拟真题列表
export function examList(data) {
  return request({
    url: "/exam/api/exampaper/page",
    method: "get",
    headers: {
      "train-code": data.code
    },
    data
  });
}
// 章节练习题目
export function chapterQuestions(data) {
  return request({
    url: "/question/api/answerRecord/getQuestionByLessonId",
    method: "get",
    data
  });
}
// 章节练习答题卡
export function chapterAnswerSheet(data) {
  return request({
    url: "/question/api/answerRecord/getQuestionListByLessonId",
    method: "get",
    data
  });
}
// 章节练习题目提交
export function chapterQuestionSubmit(data) {
  return request({
    url: "/question/api/answerRecord/answerChapter",
    method: "get",
    headers: {
      "Content-Type": ""
    },
    data: data
  });
}
// 考试题目提交
export function examQuestionSubmit(data) {
  return request({
    url: "/exam/api/exampaper/answerQuestion",
    method: "post",
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    data: data
  });
}
// 章节练习纠错
export function correction(data) {
  return request({
    url: "/course/api/correction",
    method: "post",
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    data
  });
}

// 开始考试提示信息
export function examTip(data) {
  return request({
    url: "/exam/api/exampaper/startExam",
    method: "get",
    data: data
  });
}

// 考试题目
export function examQuestions(data) {
  return request({
    url: "/exam/api/exampaper/startAnswer",
    method: "get",
    data
  });
}

// 考试提交试卷
export function examSubmit(data) {
  return request({
    url: "/exam/api/exampaper/submitEaxmPaper",
    method: "get",
    data
  });
}

// 考试批阅详情
export function examResult(data) {
  return request({
    url: "/exam/api/exampaper/resultDetail",
    method: "get",
    data
  });
}

// 错题题目
export function errorQuestions(data) {
  return request({
    url: "/exam/api/examwrong/page",
    method: "get",
    data
  });
}

// 错题答题卡
export function errorAnswerCardData(data) {
  return request({
    url: "/exam/api/examwrong/getAnswerCardData",
    method: "get",
    data
  });
}

// 移除错题
export function removeErrorQuestion(data) {
  return request({
    url: "/exam/api/examwrong/del",
    method: "get",
    data
  });
}

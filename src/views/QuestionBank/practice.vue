<template>
  <div class="practice">
    <div class="Breadcrumb">
      <img src="@/assets/images/questionBank/location.png" alt="" />
      <span>{{ $route.query.name }} > </span>
      <span> {{ $route.query.type }} > </span>
      <span> {{ $route.query.courseName }} > </span>
      <span style="color:#333333">{{ $route.query.lessonName }}</span>
    </div>
    <div class="content">
      <div class="content-l">
        <swiper ref="mySwiper" :options="swiperOptions" style="height:750px">
          <!-- 单选题 -->
          <swiper-slide
            v-for="(item, index) in singleChoiceList"
            :key="item.id"
          >
            <div class="prev" @click="prev">上一题</div>
            <div class="next" @click="next">下一题</div>
            <span class="questionType">单选题</span>
            <p>
              <span>{{ index + 1 }}.</span>
              <span class="editor" v-html="item.content"></span>
            </p>
            <el-radio-group
              :disabled="item.userAnswer != null"
              v-model="item.userAnswer"
              @change="singleChoice(item)"
            >
              <!-- class="error" 代表选择错误的选项 -->
              <el-radio
                :label="ele.name"
                v-for="ele in JSON.parse(item.optionsContent)"
                :key="ele.name"
                >{{ ele.name }}.
                <span class="editor" v-html="ele.content"></span
              ></el-radio>
            </el-radio-group>
            <div class="analysis">
              <div class="analysis-l">
                <div class="jiucuo" @click="openCorrect(item)">
                  <img
                    :src="
                      correctDialog
                        ? require('@/assets/images/questionBank/jiucuoActive.png')
                        : require('@/assets/images/questionBank/jiucuo.png')
                    "
                    alt=""
                  />
                  <span :style="correctDialog ? 'color:#FFA900' : ''"
                    >纠错</span
                  >
                </div>
                <div class="collect" @click="myCollect">
                  <img
                    :src="
                      isCollect
                        ? require('@/assets/images/questionBank/collectActive.png')
                        : require('@/assets/images/questionBank/collect.png')
                    "
                    alt=""
                  />
                  <span :style="isCollect ? 'color:#17A5F2' : ''">收藏</span>
                </div>
                <div class="sign" @click="mySign">
                  <img
                    :src="
                      isSign
                        ? require('@/assets/images/questionBank/signActive.png')
                        : require('@/assets/images/questionBank/sign.png')
                    "
                    alt=""
                  />
                  <span :style="isSign ? 'color:#E82020' : ''">标记</span>
                </div>
              </div>
              <div class="analysis-r" @click="watchAnalysis(item)">
                <span>查看解析</span>
                <img src="@/assets/images/questionBank/open.png" alt="" />
              </div>

              <div class="analysisContent" v-if="item.analysisShow">
                <div style="margin:10px 0" v-if="item.userAnswer">
                  <img
                    :src="
                      item.userAnswer == item.answer
                        ? require('@/assets/images/questionBank/trueBig.png')
                        : require('@/assets/images/questionBank/errorBig.png')
                    "
                    alt=""
                  />
                </div>
                <div class="myAnswer">
                  <div class="myAnswer-l">我的答案：</div>
                  <div class="myAnswer-r">
                    {{ item.userAnswer == null ? "未作答" : item.userAnswer }}
                  </div>
                </div>
                <div class="referenceAnswer">
                  <div class="referenceAnswer-l">参考答案：</div>
                  <div class="referenceAnswer-r">{{ item.answer }}</div>
                </div>
                <div class="answerResult">
                  <div class="answerResult-l">
                    <span>解</span>
                    <span style="margin-right: 6px;"> 析：</span>
                  </div>
                  <div class="answerResult-r" v-html="item.analysis">
                    <!-- {{ item.analysis }} -->
                  </div>
                </div>
              </div>
            </div>
          </swiper-slide>
          <!-- 多选题 -->
          <swiper-slide
            v-for="(item, index) in multipleChoiceList"
            :key="item.id"
          >
            <div class="prev" @click="prev">上一题</div>
            <div class="next" @click="next">下一题</div>
            <span class="questionType">多选题</span>
            <p>
              <span>{{ singleChoiceList.length + index + 1 }}.</span>
              <span class="editor" v-html="item.content"></span>
            </p>
            <el-checkbox-group
              v-model="item.userAnswer"
              :disabled="item.analysisShow"
            >
              <el-checkbox
                :label="ele.name"
                v-for="ele in JSON.parse(item.optionsContent)"
                :key="ele.name"
                >{{ ele.name }}.<span class="editor" v-html="ele.content"></span
              ></el-checkbox>
            </el-checkbox-group>
            <div style="display:flex;justify-content: center">
              <el-button type="primary" @click="multipleChoice(item)"
                >提交</el-button
              >
            </div>

            <div class="analysis">
              <div class="analysis-l">
                <div class="jiucuo" @click="openCorrect(item)">
                  <img
                    :src="
                      correctDialog
                        ? require('@/assets/images/questionBank/jiucuoActive.png')
                        : require('@/assets/images/questionBank/jiucuo.png')
                    "
                    alt=""
                  />
                  <span :style="correctDialog ? 'color:#FFA900' : ''"
                    >纠错</span
                  >
                </div>
                <div class="collect" @click="myCollect">
                  <img
                    :src="
                      isCollect
                        ? require('@/assets/images/questionBank/collectActive.png')
                        : require('@/assets/images/questionBank/collect.png')
                    "
                    alt=""
                  />
                  <span :style="isCollect ? 'color:#17A5F2' : ''">收藏</span>
                </div>
                <div class="sign" @click="mySign">
                  <img
                    :src="
                      isSign
                        ? require('@/assets/images/questionBank/signActive.png')
                        : require('@/assets/images/questionBank/sign.png')
                    "
                    alt=""
                  />
                  <span :style="isSign ? 'color:#E82020' : ''">标记</span>
                </div>
              </div>
              <div class="analysis-r" @click="watchAnalysis(item)">
                <span>查看解析</span>
                <img src="@/assets/images/questionBank/open.png" alt="" />
              </div>

              <div class="analysisContent" v-show="item.analysisShow">
                <div style="margin:10px 0" v-show="item.userAnswer.length > 0">
                  <img
                    :src="
                      item.userAnswer.join('') ==
                      JSON.parse(item.answer).join('')
                        ? require('@/assets/images/questionBank/trueBig.png')
                        : require('@/assets/images/questionBank/errorBig.png')
                    "
                    alt=""
                  />
                </div>
                <div class="myAnswer">
                  <div class="myAnswer-l">我的答案：</div>
                  <div class="myAnswer-r">
                    {{
                      item.userAnswer.length == 0 ? "未作答" : item.userAnswer
                    }}
                  </div>
                </div>
                <div class="referenceAnswer">
                  <div class="referenceAnswer-l">参考答案：</div>
                  <div class="referenceAnswer-r">{{ item.answer }}</div>
                </div>
                <div class="answerResult">
                  <div class="answerResult-l">
                    <span>解</span>
                    <span style="margin-right: 6px;"> 析：</span>
                  </div>
                  <div class="answerResult-r">
                    {{ item.analysis }}
                  </div>
                </div>
              </div>
            </div>
          </swiper-slide>
          <!-- 判断题 -->
          <swiper-slide v-for="(item, index) in judgeList" :key="item.id">
            <div class="prev" @click="prev">上一题</div>
            <div class="next" @click="next">下一题</div>
            <span class="questionType">判断题</span>
            <p>
              <span
                >{{
                  singleChoiceList.length +
                    multipleChoiceList.length +
                    index +
                    1
                }}.</span
              >{{ item.content }}
            </p>
            <el-radio-group
              :disabled="item.userAnswer != null"
              v-model="item.userAnswer"
              @change="singleChoice(item)"
            >
              <!-- class="error" 代表选择错误的选项 -->
              <el-radio label="true">A. 正确</el-radio>
              <el-radio label="false">B. 错误</el-radio>
            </el-radio-group>
            <div class="analysis">
              <div class="analysis-l">
                <div class="jiucuo" @click="openCorrect(item)">
                  <img
                    :src="
                      correctDialog
                        ? require('@/assets/images/questionBank/jiucuoActive.png')
                        : require('@/assets/images/questionBank/jiucuo.png')
                    "
                    alt=""
                  />
                  <span :style="correctDialog ? 'color:#FFA900' : ''"
                    >纠错</span
                  >
                </div>
                <div class="collect" @click="myCollect">
                  <img
                    :src="
                      isCollect
                        ? require('@/assets/images/questionBank/collectActive.png')
                        : require('@/assets/images/questionBank/collect.png')
                    "
                    alt=""
                  />
                  <span :style="isCollect ? 'color:#17A5F2' : ''">收藏</span>
                </div>
                <div class="sign" @click="mySign">
                  <img
                    :src="
                      isSign
                        ? require('@/assets/images/questionBank/signActive.png')
                        : require('@/assets/images/questionBank/sign.png')
                    "
                    alt=""
                  />
                  <span :style="isSign ? 'color:#E82020' : ''">标记</span>
                </div>
              </div>
              <div class="analysis-r" @click="watchAnalysis(item)">
                <span>查看解析</span>
                <img src="@/assets/images/questionBank/open.png" alt="" />
              </div>

              <div class="analysisContent" v-if="item.analysisShow">
                <div style="margin:10px 0" v-if="item.userAnswer != null">
                  <img
                    :src="
                      item.userAnswer == item.answer
                        ? require('@/assets/images/questionBank/trueBig.png')
                        : require('@/assets/images/questionBank/errorBig.png')
                    "
                    alt=""
                  />
                </div>
                <div class="myAnswer">
                  <div class="myAnswer-l">我的答案：</div>
                  <div class="myAnswer-r">
                    {{
                      item.userAnswer == null
                        ? "未作答"
                        : item.userAnswer == "true"
                        ? "正确"
                        : "错误"
                    }}
                  </div>
                </div>
                <div class="referenceAnswer">
                  <div class="referenceAnswer-l">参考答案：</div>
                  <div class="referenceAnswer-r">
                    {{ item.answer == "true" ? "正确" : "错误" }}
                  </div>
                </div>
                <div class="answerResult">
                  <div class="answerResult-l">
                    <span>解</span>
                    <span style="margin-right: 6px;"> 析：</span>
                  </div>
                  <div class="answerResult-r">
                    {{ item.analysis }}
                  </div>
                </div>
              </div>
            </div>
          </swiper-slide>
          <!-- 填空题 -->
          <swiper-slide v-for="(item, index) in gapList" :key="item.id">
            <div class="prev" @click="prev">上一题</div>
            <div class="next" @click="next">下一题</div>
            <span class="questionType">填空题</span>
            <p>
              <span
                >{{
                  singleChoiceList.length +
                    multipleChoiceList.length +
                    judgeList.length +
                    index +
                    1
                }}.</span
              >{{ item.content }}
            </p>

            <div
              style="display: flex;align-items: center;"
              v-for="(ele, index) in item.userAnswer"
              :key="index"
            >
              <span
                style="min-width:70px;font-size: 16px;font-family: Microsoft YaHei;font-weight: 400;color: #999999;"
                >第{{ index + 1 }}空：</span
              >
              <el-input
                :disabled="item.analysisShow"
                v-model="ele.content"
                placeholder="请输入您的答案"
              ></el-input>
            </div>

            <div style="display:flex;justify-content: center;margin:8px auto">
              <el-button type="primary" @click="changeGap(item)"
                >提交</el-button
              >
            </div>

            <div class="analysis">
              <div class="analysis-l">
                <div class="jiucuo" @click="openCorrect(item)">
                  <img
                    :src="
                      correctDialog
                        ? require('@/assets/images/questionBank/jiucuoActive.png')
                        : require('@/assets/images/questionBank/jiucuo.png')
                    "
                    alt=""
                  />
                  <span :style="correctDialog ? 'color:#FFA900' : ''"
                    >纠错</span
                  >
                </div>
                <div class="collect" @click="myCollect">
                  <img
                    :src="
                      isCollect
                        ? require('@/assets/images/questionBank/collectActive.png')
                        : require('@/assets/images/questionBank/collect.png')
                    "
                    alt=""
                  />
                  <span :style="isCollect ? 'color:#17A5F2' : ''">收藏</span>
                </div>
                <div class="sign" @click="mySign">
                  <img
                    :src="
                      isSign
                        ? require('@/assets/images/questionBank/signActive.png')
                        : require('@/assets/images/questionBank/sign.png')
                    "
                    alt=""
                  />
                  <span :style="isSign ? 'color:#E82020' : ''">标记</span>
                </div>
              </div>
              <div class="analysis-r" @click="watchAnalysis(item)">
                <span>查看解析</span>
                <img src="@/assets/images/questionBank/open.png" alt="" />
              </div>

              <div class="analysisContent" v-if="item.analysisShow">
                <div
                  style="margin:10px 0"
                  v-if="gapFun(item.userAnswer).join('') != ''"
                >
                  <img
                    :src="
                      gapFun(item.userAnswer).join('') ==
                      JSON.parse(item.answer).join('')
                        ? require('@/assets/images/questionBank/trueBig.png')
                        : require('@/assets/images/questionBank/errorBig.png')
                    "
                    alt=""
                  />
                </div>
                <div class="myAnswer">
                  <div class="myAnswer-l">我的答案：</div>
                  <div class="myAnswer-r">
                    {{
                      gapFun(item.userAnswer).join("") == ""
                        ? "未作答"
                        : gapFun(item.userAnswer)
                    }}
                  </div>
                </div>
                <div class="referenceAnswer">
                  <div class="referenceAnswer-l">参考答案：</div>
                  <div class="referenceAnswer-r">{{ item.answer }}</div>
                </div>
                <div class="answerResult">
                  <div class="answerResult-l">
                    <span>解</span>
                    <span style="margin-right: 6px;"> 析：</span>
                  </div>
                  <div class="answerResult-r">
                    {{ item.analysis }}
                  </div>
                </div>
              </div>
            </div>
          </swiper-slide>
          <!-- 问答题 -->
          <swiper-slide v-for="(item, index) in essayList" :key="item.id">
            <div class="prev" @click="prev">上一题</div>
            <div class="next" @click="next">下一题</div>
            <span class="questionType">问答题</span>
            <p>
              <span
                >{{
                  singleChoiceList.length +
                    multipleChoiceList.length +
                    judgeList.length +
                    gapList.length +
                    index +
                    1
                }}.</span
              >{{ item.content }}
            </p>

            <el-input
              :disabled="item.analysisShow"
              type="textarea"
              :rows="4"
              placeholder=""
              v-model="item.userAnswer"
            >
            </el-input>

            <div style="display:flex;justify-content: center;margin:8px auto">
              <el-button type="primary" @click="changeEssay(item)"
                >提交</el-button
              >
            </div>

            <div class="analysis">
              <div class="analysis-l">
                <div class="jiucuo" @click="openCorrect(item)">
                  <img
                    :src="
                      correctDialog
                        ? require('@/assets/images/questionBank/jiucuoActive.png')
                        : require('@/assets/images/questionBank/jiucuo.png')
                    "
                    alt=""
                  />
                  <span :style="correctDialog ? 'color:#FFA900' : ''"
                    >纠错</span
                  >
                </div>
                <div class="collect" @click="myCollect">
                  <img
                    :src="
                      isCollect
                        ? require('@/assets/images/questionBank/collectActive.png')
                        : require('@/assets/images/questionBank/collect.png')
                    "
                    alt=""
                  />
                  <span :style="isCollect ? 'color:#17A5F2' : ''">收藏</span>
                </div>
                <div class="sign" @click="mySign">
                  <img
                    :src="
                      isSign
                        ? require('@/assets/images/questionBank/signActive.png')
                        : require('@/assets/images/questionBank/sign.png')
                    "
                    alt=""
                  />
                  <span :style="isSign ? 'color:#E82020' : ''">标记</span>
                </div>
              </div>
              <div class="analysis-r" @click="watchAnalysis(item)">
                <span>查看解析</span>
                <img src="@/assets/images/questionBank/open.png" alt="" />
              </div>

              <div class="analysisContent" v-if="item.analysisShow">
                <div style="margin:10px 0" v-if="item.userAnswer != null">
                  <img
                    :src="
                      item.userAnswer == item.answer
                        ? require('@/assets/images/questionBank/trueBig.png')
                        : require('@/assets/images/questionBank/errorBig.png')
                    "
                    alt=""
                  />
                </div>
                <div class="myAnswer">
                  <div class="myAnswer-l">我的答案：</div>
                  <div class="myAnswer-r">
                    {{ item.userAnswer == null ? "未作答" : item.userAnswer }}
                  </div>
                </div>
                <div class="referenceAnswer">
                  <div class="referenceAnswer-l">参考答案：</div>
                  <div class="referenceAnswer-r">{{ item.answer }}</div>
                </div>
                <div class="answerResult">
                  <div class="answerResult-l">
                    <span>解</span>
                    <span style="margin-right: 6px;"> 析：</span>
                  </div>
                  <div class="answerResult-r">
                    {{ item.analysis }}
                  </div>
                </div>
              </div>
            </div>
          </swiper-slide>
          <!-- 材料分析题 -->
          <swiper-slide
            style="overflow: auto;"
            v-for="(el, index) in analysisList"
            :key="el.id"
          >
            <div class="prev" @click="prev">上一题</div>
            <div class="next" @click="next">下一题</div>
            <span class="questionType">材料分析题</span>
            <p>
              <span
                >{{
                  singleChoiceList.length +
                    multipleChoiceList.length +
                    judgeList.length +
                    gapList.length +
                    essayList.length +
                    index +
                    1
                }}.</span
              >{{ el.content }}
            </p>
            <!-- 材料分析题下的单选题 -->
            <div
              style="padding:30px 20px"
              v-for="(item, index) in el.analysisSingleChoiceList"
              :key="item.id"
            >
              <div class="prev" @click="prev">上一题</div>
              <div class="next" @click="next">下一题</div>
              <span class="questionType">单选题</span>
              <p>
                <span>{{ index + 1 }}.</span>
                <span class="editor" v-html="item.content"></span>
              </p>
              <el-radio-group
                :disabled="item.userAnswer != null"
                v-model="item.userAnswer"
                @change="singleChoice(item, el)"
              >
                <!-- class="error" 代表选择错误的选项 -->
                <el-radio
                  :label="ele.name"
                  v-for="ele in JSON.parse(item.optionsContent)"
                  :key="ele.name"
                  >{{ ele.name }}.<span
                    class="editor"
                    v-html="ele.content"
                  ></span
                ></el-radio>
              </el-radio-group>
              <div class="analysis">
                <div class="analysis-l">
                  <div class="jiucuo" @click="openCorrect(item)">
                    <img
                      :src="
                        correctDialog
                          ? require('@/assets/images/questionBank/jiucuoActive.png')
                          : require('@/assets/images/questionBank/jiucuo.png')
                      "
                      alt=""
                    />
                    <span :style="correctDialog ? 'color:#FFA900' : ''"
                      >纠错</span
                    >
                  </div>
                  <div class="collect" @click="myCollect">
                    <img
                      :src="
                        isCollect
                          ? require('@/assets/images/questionBank/collectActive.png')
                          : require('@/assets/images/questionBank/collect.png')
                      "
                      alt=""
                    />
                    <span :style="isCollect ? 'color:#17A5F2' : ''">收藏</span>
                  </div>
                  <div class="sign" @click="mySign">
                    <img
                      :src="
                        isSign
                          ? require('@/assets/images/questionBank/signActive.png')
                          : require('@/assets/images/questionBank/sign.png')
                      "
                      alt=""
                    />
                    <span :style="isSign ? 'color:#E82020' : ''">标记</span>
                  </div>
                </div>
                <div class="analysis-r" @click="watchAnalysis(item)">
                  <span>查看解析</span>
                  <img src="@/assets/images/questionBank/open.png" alt="" />
                </div>

                <div class="analysisContent" v-if="item.analysisShow">
                  <div style="margin:10px 0" v-if="item.userAnswer">
                    <img
                      :src="
                        item.userAnswer == item.answer
                          ? require('@/assets/images/questionBank/trueBig.png')
                          : require('@/assets/images/questionBank/errorBig.png')
                      "
                      alt=""
                    />
                  </div>
                  <div class="myAnswer">
                    <div class="myAnswer-l">我的答案：</div>
                    <div class="myAnswer-r">
                      {{ item.userAnswer == null ? "未作答" : item.userAnswer }}
                    </div>
                  </div>
                  <div class="referenceAnswer">
                    <div class="referenceAnswer-l">参考答案：</div>
                    <div class="referenceAnswer-r">{{ item.answer }}</div>
                  </div>
                  <div class="answerResult">
                    <div class="answerResult-l">
                      <span>解</span>
                      <span style="margin-right: 6px;"> 析：</span>
                    </div>
                    <div class="answerResult-r">
                      {{ item.analysis }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 材料分析题下的多选题 -->
            <div
              style="padding:30px 20px"
              v-for="(item, index) in el.analysisMultipleChoiceList"
              :key="item.id"
            >
              <div class="prev" @click="prev">上一题</div>
              <div class="next" @click="next">下一题</div>
              <span class="questionType">多选题</span>
              <p>
                <span
                  >{{ el.analysisSingleChoiceList.length + index + 1 }}.</span
                >
                <span class="editor" v-html="item.content"></span>
              </p>
              <el-checkbox-group
                :disabled="item.analysisShow"
                v-model="item.userAnswer"
              >
                <el-checkbox
                  :label="ele.name"
                  v-for="ele in JSON.parse(item.optionsContent)"
                  :key="ele.name"
                  >{{ ele.name }}.<span
                    class="editor"
                    v-html="ele.content"
                  ></span
                ></el-checkbox>
              </el-checkbox-group>
              <div style="display:flex;justify-content: center">
                <el-button type="primary" @click="multipleChoice(item, el)"
                  >提交</el-button
                >
              </div>

              <div class="analysis">
                <div class="analysis-l">
                  <div class="jiucuo" @click="openCorrect(item)">
                    <img
                      :src="
                        correctDialog
                          ? require('@/assets/images/questionBank/jiucuoActive.png')
                          : require('@/assets/images/questionBank/jiucuo.png')
                      "
                      alt=""
                    />
                    <span :style="correctDialog ? 'color:#FFA900' : ''"
                      >纠错</span
                    >
                  </div>
                  <div class="collect" @click="myCollect">
                    <img
                      :src="
                        isCollect
                          ? require('@/assets/images/questionBank/collectActive.png')
                          : require('@/assets/images/questionBank/collect.png')
                      "
                      alt=""
                    />
                    <span :style="isCollect ? 'color:#17A5F2' : ''">收藏</span>
                  </div>
                  <div class="sign" @click="mySign">
                    <img
                      :src="
                        isSign
                          ? require('@/assets/images/questionBank/signActive.png')
                          : require('@/assets/images/questionBank/sign.png')
                      "
                      alt=""
                    />
                    <span :style="isSign ? 'color:#E82020' : ''">标记</span>
                  </div>
                </div>
                <div class="analysis-r" @click="watchAnalysis(item)">
                  <span>查看解析</span>
                  <img src="@/assets/images/questionBank/open.png" alt="" />
                </div>

                <div class="analysisContent" v-show="item.analysisShow">
                  <div
                    style="margin:10px 0"
                    v-show="item.userAnswer.length > 0"
                  >
                    <img
                      :src="
                        item.userAnswer.join('') ==
                        JSON.parse(item.answer).join('')
                          ? require('@/assets/images/questionBank/trueBig.png')
                          : require('@/assets/images/questionBank/errorBig.png')
                      "
                      alt=""
                    />
                  </div>
                  <div class="myAnswer">
                    <div class="myAnswer-l">我的答案：</div>
                    <div class="myAnswer-r">
                      {{
                        item.userAnswer.length == 0 ? "未作答" : item.userAnswer
                      }}
                    </div>
                  </div>
                  <div class="referenceAnswer">
                    <div class="referenceAnswer-l">参考答案：</div>
                    <div class="referenceAnswer-r">{{ item.answer }}</div>
                  </div>
                  <div class="answerResult">
                    <div class="answerResult-l">
                      <span>解</span>
                      <span style="margin-right: 6px;"> 析：</span>
                    </div>
                    <div class="answerResult-r">
                      {{ item.analysis }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 材料分析题下的判断题 -->
            <div
              style="padding:30px 20px"
              v-for="(item, index) in el.analysisJudgeList"
              :key="item.id"
            >
              <div class="prev" @click="prev">上一题</div>
              <div class="next" @click="next">下一题</div>
              <span class="questionType">判断题</span>
              <p>
                <span
                  >{{
                    el.analysisSingleChoiceList.length +
                      el.analysisMultipleChoiceList.length +
                      index +
                      1
                  }}.</span
                >{{ item.content }}
              </p>
              <el-radio-group
                :disabled="item.userAnswer != null"
                v-model="item.userAnswer"
                @change="singleChoice(item, el)"
              >
                <!-- class="error" 代表选择错误的选项 -->
                <el-radio label="true">A. 正确</el-radio>
                <el-radio label="false">B. 错误</el-radio>
              </el-radio-group>
              <div class="analysis">
                <div class="analysis-l">
                  <div class="jiucuo" @click="openCorrect(item)">
                    <img
                      :src="
                        correctDialog
                          ? require('@/assets/images/questionBank/jiucuoActive.png')
                          : require('@/assets/images/questionBank/jiucuo.png')
                      "
                      alt=""
                    />
                    <span :style="correctDialog ? 'color:#FFA900' : ''"
                      >纠错</span
                    >
                  </div>
                  <div class="collect" @click="myCollect">
                    <img
                      :src="
                        isCollect
                          ? require('@/assets/images/questionBank/collectActive.png')
                          : require('@/assets/images/questionBank/collect.png')
                      "
                      alt=""
                    />
                    <span :style="isCollect ? 'color:#17A5F2' : ''">收藏</span>
                  </div>
                  <div class="sign" @click="mySign">
                    <img
                      :src="
                        isSign
                          ? require('@/assets/images/questionBank/signActive.png')
                          : require('@/assets/images/questionBank/sign.png')
                      "
                      alt=""
                    />
                    <span :style="isSign ? 'color:#E82020' : ''">标记</span>
                  </div>
                </div>
                <div class="analysis-r" @click="watchAnalysis(item)">
                  <span>查看解析</span>
                  <img src="@/assets/images/questionBank/open.png" alt="" />
                </div>

                <div class="analysisContent" v-if="item.analysisShow">
                  <div style="margin:10px 0" v-if="item.userAnswer != null">
                    <img
                      :src="
                        item.userAnswer == item.answer
                          ? require('@/assets/images/questionBank/trueBig.png')
                          : require('@/assets/images/questionBank/errorBig.png')
                      "
                      alt=""
                    />
                  </div>
                  <div class="myAnswer">
                    <div class="myAnswer-l">我的答案：</div>
                    <div class="myAnswer-r">
                      {{
                        item.userAnswer == null
                          ? "未作答"
                          : item.userAnswer == "true"
                          ? "正确"
                          : "错误"
                      }}
                    </div>
                  </div>
                  <div class="referenceAnswer">
                    <div class="referenceAnswer-l">参考答案：</div>
                    <div class="referenceAnswer-r">
                      {{ item.answer == "true" ? "正确" : "错误" }}
                    </div>
                  </div>
                  <div class="answerResult">
                    <div class="answerResult-l">
                      <span>解</span>
                      <span style="margin-right: 6px;"> 析：</span>
                    </div>
                    <div class="answerResult-r">
                      {{ item.analysis }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 材料分析题下的填空题 -->
            <div
              style="padding:30px 20px"
              v-for="(item, index) in el.analysisGapList"
              :key="item.id"
            >
              <div class="prev" @click="prev">上一题</div>
              <div class="next" @click="next">下一题</div>
              <span class="questionType">填空题</span>
              <p>
                <span
                  >{{
                    el.analysisSingleChoiceList.length +
                      el.analysisMultipleChoiceList.length +
                      el.analysisJudgeList.length +
                      index +
                      1
                  }}.</span
                >{{ item.content }}
              </p>

              <div
                style="display: flex;align-items: center;"
                v-for="(ele, index) in item.userAnswer"
                :key="index"
              >
                <span
                  style="min-width:70px;font-size: 16px;font-family: Microsoft YaHei;font-weight: 400;color: #999999;"
                  >第{{ index + 1 }}空：</span
                >
                <el-input
                  :disabled="item.analysisShow"
                  v-model="ele.content"
                  placeholder="请输入您的答案"
                ></el-input>
              </div>

              <div style="display:flex;justify-content: center;margin:8px auto">
                <el-button type="primary" @click="changeGap(item)"
                  >提交</el-button
                >
              </div>

              <div class="analysis">
                <div class="analysis-l">
                  <div class="jiucuo" @click="openCorrect(item)">
                    <img
                      :src="
                        correctDialog
                          ? require('@/assets/images/questionBank/jiucuoActive.png')
                          : require('@/assets/images/questionBank/jiucuo.png')
                      "
                      alt=""
                    />
                    <span :style="correctDialog ? 'color:#FFA900' : ''"
                      >纠错</span
                    >
                  </div>
                  <div class="collect" @click="myCollect">
                    <img
                      :src="
                        isCollect
                          ? require('@/assets/images/questionBank/collectActive.png')
                          : require('@/assets/images/questionBank/collect.png')
                      "
                      alt=""
                    />
                    <span :style="isCollect ? 'color:#17A5F2' : ''">收藏</span>
                  </div>
                  <div class="sign" @click="mySign">
                    <img
                      :src="
                        isSign
                          ? require('@/assets/images/questionBank/signActive.png')
                          : require('@/assets/images/questionBank/sign.png')
                      "
                      alt=""
                    />
                    <span :style="isSign ? 'color:#E82020' : ''">标记</span>
                  </div>
                </div>
                <div class="analysis-r" @click="watchAnalysis(item)">
                  <span>查看解析</span>
                  <img src="@/assets/images/questionBank/open.png" alt="" />
                </div>

                <div class="analysisContent" v-if="item.analysisShow">
                  <div
                    style="margin:10px 0"
                    v-if="gapFun(item.userAnswer).join('') != ''"
                  >
                    <img
                      :src="
                        gapFun(item.userAnswer).join('') ==
                        JSON.parse(item.answer).join('')
                          ? require('@/assets/images/questionBank/trueBig.png')
                          : require('@/assets/images/questionBank/errorBig.png')
                      "
                      alt=""
                    />
                  </div>
                  <div class="myAnswer">
                    <div class="myAnswer-l">我的答案：</div>
                    <div class="myAnswer-r">
                      {{
                        gapFun(item.userAnswer).join("") == ""
                          ? "未作答"
                          : gapFun(item.userAnswer)
                      }}
                    </div>
                  </div>
                  <div class="referenceAnswer">
                    <div class="referenceAnswer-l">参考答案：</div>
                    <div class="referenceAnswer-r">{{ item.answer }}</div>
                  </div>
                  <div class="answerResult">
                    <div class="answerResult-l">
                      <span>解</span>
                      <span style="margin-right: 6px;"> 析：</span>
                    </div>
                    <div class="answerResult-r">
                      {{ item.analysis }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 材料分析题下的问答题 -->
            <div
              style="padding:30px 20px"
              v-for="(item, index) in el.analysisEssayList"
              :key="item.id"
            >
              <div class="prev" @click="prev">上一题</div>
              <div class="next" @click="next">下一题</div>
              <span class="questionType">问答题</span>
              <p>
                <span
                  >{{
                    el.analysisSingleChoiceList.length +
                      el.analysisMultipleChoiceList.length +
                      el.analysisJudgeList.length +
                      el.analysisGapList.length +
                      index +
                      1
                  }}.</span
                >{{ item.content }}
              </p>

              <el-input
                :disabled="item.analysisShow"
                type="textarea"
                :rows="4"
                placeholder=""
                v-model="item.userAnswer"
              >
              </el-input>

              <div style="display:flex;justify-content: center;margin:8px auto">
                <el-button type="primary" @click="changeEssay(item)"
                  >提交</el-button
                >
              </div>

              <div class="analysis">
                <div class="analysis-l">
                  <div class="jiucuo" @click="openCorrect(item)">
                    <img
                      :src="
                        correctDialog
                          ? require('@/assets/images/questionBank/jiucuoActive.png')
                          : require('@/assets/images/questionBank/jiucuo.png')
                      "
                      alt=""
                    />
                    <span :style="correctDialog ? 'color:#FFA900' : ''"
                      >纠错</span
                    >
                  </div>
                  <div class="collect" @click="myCollect">
                    <img
                      :src="
                        isCollect
                          ? require('@/assets/images/questionBank/collectActive.png')
                          : require('@/assets/images/questionBank/collect.png')
                      "
                      alt=""
                    />
                    <span :style="isCollect ? 'color:#17A5F2' : ''">收藏</span>
                  </div>
                  <div class="sign" @click="mySign">
                    <img
                      :src="
                        isSign
                          ? require('@/assets/images/questionBank/signActive.png')
                          : require('@/assets/images/questionBank/sign.png')
                      "
                      alt=""
                    />
                    <span :style="isSign ? 'color:#E82020' : ''">标记</span>
                  </div>
                </div>
                <div class="analysis-r" @click="watchAnalysis(item)">
                  <span>查看解析</span>
                  <img src="@/assets/images/questionBank/open.png" alt="" />
                </div>

                <div class="analysisContent" v-if="item.analysisShow">
                  <div style="margin:10px 0" v-if="item.userAnswer != null">
                    <img
                      :src="
                        item.userAnswer == item.answer
                          ? require('@/assets/images/questionBank/trueBig.png')
                          : require('@/assets/images/questionBank/errorBig.png')
                      "
                      alt=""
                    />
                  </div>
                  <div class="myAnswer">
                    <div class="myAnswer-l">我的答案：</div>
                    <div class="myAnswer-r">
                      {{ item.userAnswer == null ? "未作答" : item.userAnswer }}
                    </div>
                  </div>
                  <div class="referenceAnswer">
                    <div class="referenceAnswer-l">参考答案：</div>
                    <div class="referenceAnswer-r">{{ item.answer }}</div>
                  </div>
                  <div class="answerResult">
                    <div class="answerResult-l">
                      <span>解</span>
                      <span style="margin-right: 6px;"> 析：</span>
                    </div>
                    <div class="answerResult-r">
                      {{ item.analysis }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
      <!-- 答题卡 -->
      <div class="content-r">
        <div class="answerSheet-t">
          <div class="progress">
            <span>做题进度</span>
            <span style="color: #17A5F2;">{{ finishLength }}/{{ total }}</span>
          </div>
          <el-progress
            style="margin-top:10px"
            :percentage="(finishLength / total) * 100"
          ></el-progress>
          <div class="btns">
            <div
              :class="mode == 0 ? 'pra-btn' : 'bt-btn'"
              @click="exerciseMode"
            >
              练习模式
            </div>
            <div :class="mode == 1 ? 'pra-btn' : 'bt-btn'" @click="finishMode">
              背题模式
            </div>
          </div>
        </div>
        <div class="answerSheet">
          <p class="title">答题卡</p>

          <div class="typeQues" v-if="singleChoiceList.length > 0">
            <div>单选题</div>
            <ul>
              <li
                :class="item.userAnswer ? 'finish' : ''"
                @click="swiper.slideTo(index, 500, false)"
                v-for="(item, index) in singleChoiceList"
                :key="index"
              >
                {{ index + 1 }}
              </li>
            </ul>
          </div>

          <div class="typeQues" v-if="multipleChoiceList.length > 0">
            <div>多选题</div>
            <ul>
              <li
                :class="item.userAnswer.length > 0 ? 'finish' : ''"
                @click="
                  swiper.slideTo(singleChoiceList.length + index, 500, false)
                "
                v-for="(item, index) in multipleChoiceList"
                :key="index"
              >
                {{ singleChoiceList.length + index + 1 }}
              </li>
            </ul>
          </div>

          <div class="typeQues" v-if="undefinedChoiceList.length > 0">
            <div>不定项选择题</div>
            <ul>
              <li
                @click="
                  swiper.slideTo(
                    singleChoiceList.length + multipleChoiceList.length + index,
                    500,
                    false
                  )
                "
                v-for="(item, index) in undefinedChoiceList"
                :key="index"
              >
                {{
                  singleChoiceList.length +
                    multipleChoiceList.length +
                    index +
                    1
                }}
              </li>
            </ul>
          </div>

          <div class="typeQues" v-if="judgeList.length > 0">
            <div>判断题</div>
            <ul>
              <li
                :class="item.userAnswer ? 'finish' : ''"
                @click="
                  swiper.slideTo(
                    singleChoiceList.length +
                      multipleChoiceList.length +
                      undefinedChoiceList.length +
                      index,
                    500,
                    false
                  )
                "
                v-for="(item, index) in judgeList"
                :key="index"
              >
                {{
                  singleChoiceList.length +
                    multipleChoiceList.length +
                    undefinedChoiceList.length +
                    index +
                    1
                }}
              </li>
            </ul>
          </div>

          <div class="typeQues" v-if="gapList.length > 0">
            <div>填空题</div>
            <ul>
              <li
                :class="gapFun(item.userAnswer).join('') == '' ? '' : 'finish'"
                @click="
                  swiper.slideTo(
                    singleChoiceList.length +
                      multipleChoiceList.length +
                      undefinedChoiceList.length +
                      judgeList.length +
                      index,
                    500,
                    false
                  )
                "
                v-for="(item, index) in gapList"
                :key="index"
              >
                {{
                  singleChoiceList.length +
                    multipleChoiceList.length +
                    undefinedChoiceList.length +
                    judgeList.length +
                    index +
                    1
                }}
              </li>
            </ul>
          </div>

          <div class="typeQues" v-if="essayList.length > 0">
            <div>问答题</div>
            <ul>
              <li
                :class="item.userAnswer ? 'finish' : ''"
                @click="
                  swiper.slideTo(
                    singleChoiceList.length +
                      multipleChoiceList.length +
                      undefinedChoiceList.length +
                      judgeList.length +
                      gapList.length +
                      index,
                    500,
                    false
                  )
                "
                v-for="(item, index) in essayList"
                :key="index"
              >
                {{
                  singleChoiceList.length +
                    multipleChoiceList.length +
                    undefinedChoiceList.length +
                    judgeList.length +
                    gapList.length +
                    index +
                    1
                }}
              </li>
            </ul>
          </div>

          <div class="typeQues" v-if="analysisList.length > 0">
            <div>材料分析题</div>
            <ul>
              <li
                :class="item.userAnswer == true ? 'finish' : ''"
                @click="
                  swiper.slideTo(
                    singleChoiceList.length +
                      multipleChoiceList.length +
                      undefinedChoiceList.length +
                      judgeList.length +
                      gapList.length +
                      essayList.length +
                      index,
                    500,
                    false
                  )
                "
                v-for="(item, index) in analysisList"
                :key="index"
              >
                {{
                  singleChoiceList.length +
                    multipleChoiceList.length +
                    undefinedChoiceList.length +
                    judgeList.length +
                    gapList.length +
                    essayList.length +
                    index +
                    1
                }}
              </li>
            </ul>
          </div>

          <div class="bottom">
            <div class="tips">
              <div class="tipone">
                <div
                  style="width: 16px;height: 16px;background: #17A5F2;border-radius: 4px;"
                ></div>
                <span>已做</span>
              </div>
              <div class="tipone">
                <div
                  style="width: 16px;height: 16px;border: 1px solid #C4C4C4;border-radius: 4px;"
                ></div>
                <span>未做</span>
              </div>
              <div class="tipone">
                <div
                  style="width: 16px;height: 16px;border: 1px solid #E82020;border-radius: 4px;"
                ></div>
                <span>标记</span>
              </div>
            </div>

            <div class="saveProgress" @click="saveProgress">
              保存进度，下次继续
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 提交弹窗 -->
    <el-dialog
      class="saveDia"
      width="480px"
      title="确认信息"
      :visible.sync="saveDialog"
    >
      <div class="save">
        <p v-if="total == finishLength">您已完成全部练习</p>
        <p v-else>
          您还有
          <span>{{ total - finishLength }}</span> 道题目未答，是否确定下次再做？
        </p>
        <div class="btns">
          <div class="continue" @click="saveDialog = false">继续做题</div>
          <div class="noContinue" @click="$router.go(-1)">下次继续</div>
        </div>
      </div>
    </el-dialog>

    <!-- 纠错弹窗 -->
    <el-dialog
      class="saveDia"
      width="480px"
      title="错题反馈"
      :visible.sync="correctDialog"
      @close="closeDialog"
    >
      <div class="correctBox">
        <p>您的意见对我们很宝贵</p>
        <div class="correctType">
          <p class="label">纠错类型：</p>
          <ul>
            <li
              @click="correct(0)"
              :class="correctTypeIndex == 0 ? 'active' : ''"
            >
              题干或解析错误
            </li>
            <li
              @click="correct(1)"
              :class="correctTypeIndex == 1 ? 'active' : ''"
            >
              解析不匹配
            </li>
            <li
              @click="correct(2)"
              :class="correctTypeIndex == 2 ? 'active' : ''"
            >
              答案错误
            </li>
            <li
              @click="correct(3)"
              :class="correctTypeIndex == 3 ? 'active' : ''"
            >
              其它
            </li>
          </ul>
        </div>

        <div class="correctType">
          <p class="label">我要补充：</p>
          <el-input
            style="margin-top:12px"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
            placeholder=""
            v-model="extra"
          >
          </el-input>
          <div class="btns">
            <div class="cancel" @click="cancel">取消</div>
            <div class="confirm" @click="confirm">确认</div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  chapterQuestions,
  chapterAnswerSheet,
  chapterQuestionSubmit,
  correction
} from "@/api/questionBank/questionBank.js";
import { Swiper, SwiperSlide, directive } from "vue-awesome-swiper";
import "swiper/swiper-bundle.css";
export default {
  name: "Practice",
  components: {
    Swiper,
    SwiperSlide
  },
  directives: {
    swiper: directive
  },
  data() {
    return {
      swiperOptions: {
        // //显示分页
        // pagination: {
        //   el: ".swiper-pagination",
        //   type: "bullets",
        //   clickable: true,
        //   dynamicBullets: false
        // },
        // // 设置点击箭头
        // navigation: {
        //   nextEl: ".swiper-button-next",
        //   prevEl: ".swiper-button-prev"
        // },
        // 获取当前下标
        on: {
          slideChangeTransitionEnd: () => {
            // this.swiperIndex = this.$refs.mySwiper.$swiper.activeIndex;
            console.log(this.$refs.mySwiper.$swiper.activeIndex); //切换结束时，告诉我现在是第几个slide
          }
        }
        //自动轮播
        // autoplay: {
        //   delay: 2000,
        //   //当用户滑动图片后继续自动轮播
        //   disableOnInteraction: false
        // }
        //开启循环模式
        // loop: true
      },
      analysisShow: false,
      // 题目列表
      questionLists: [],
      saveDialog: false, //提交进度弹窗
      correctDialog: false, //纠错弹窗
      correctTypeIndex: 0,
      extra: "",
      isCollect: false, //是否收藏
      isSign: false, //是否标记
      singleChoiceList: [],
      multipleChoiceList: [],
      undefinedChoiceList: [],
      judgeList: [],
      gapList: [],
      essayList: [],
      analysisList: [],
      analysisSingleChoiceList: [],
      analysisMultipleChoiceList: [],
      analysisUndefinedChoiceList: [],
      analysisJudgeList: [],
      analysisGapList: [],
      analysisEssayList: [],
      // 练习模式
      mode: 0,
      total: null,
      finishLength: 0,
      single: [],
      judge: [],
      analysis: [],
      gap: [],
      multiple: [],
      essay: []
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper;
    }
  },
  created() {
    this.init();
    console.log(this.$route.query, 258);
  },
  methods: {
    init() {
      chapterQuestions({
        lessonId: this.$route.query.lessonId,
        size: 999
      }).then(res => {
        console.log(res, "题目"); //题目有分页
        var btMode = this._.cloneDeep(res.data.records);
        this.singleChoiceList = [];
        this.multipleChoiceList = [];
        this.undefinedChoiceList = [];
        this.judgeList = [];
        this.gapList = [];
        this.essayList = [];
        this.analysisList = [];
        this.analysisSingleChoiceList = [];
        this.analysisMultipleChoiceList = [];
        this.analysisUndefinedChoiceList = [];
        this.analysisJudgeList = [];
        this.analysisGapList = [];
        this.analysisEssayList = [];
        // 背题模式
        if (this.mode == 1) {
          btMode.forEach(ele => {
            ele.analysisShow = true;
            ele.userAnswer = ele.answer;
            if (ele.typeId == 1) {
              this.singleChoiceList.push(ele);
            } else if (ele.typeId == 2) {
              this.multipleChoiceList.push(ele);
            } else if (ele.typeId == 3) {
              this.undefinedChoiceList.push(ele);
            } else if (ele.typeId == 4) {
              this.judgeList.push(ele);
            } else if (ele.typeId == 5) {
              this.gapList.push(ele);
            } else if (ele.typeId == 6) {
              this.essayList.push(ele);
            } else {
              this.analysisList.push(ele);
            }
          });
        } else {
          // 练习模式
          res.data.records.forEach(ele => {
            ele.analysisShow = false;
            if (ele.typeId == 1) {
              this.singleChoiceList.push(ele);
            } else if (ele.typeId == 2) {
              this.multipleChoiceList.push(ele);
            } else if (ele.typeId == 3) {
              this.undefinedChoiceList.push(ele);
            } else if (ele.typeId == 4) {
              this.judgeList.push(ele);
            } else if (ele.typeId == 5) {
              this.gapList.push(ele);
            } else if (ele.typeId == 6) {
              this.essayList.push(ele);
            } else {
              this.analysisList.push(ele);
            }
          });
        }

        // 多选题数据做处理
        this.multipleChoiceList.forEach(item => {
          try {
            if (!item.userAnswer) {
              item.userAnswer = [];
            } else {
              item.userAnswer = JSON.parse(item.userAnswer);
            }
          } catch (e) {
            item.userAnswer = [];
          }
        });
        // 填空题数据做处理
        this.gapList.forEach(item => {
          try {
            if (!item.userAnswer) {
              item.userAnswer = [];
              if (item.answer != "") {
                console.log(JSON.parse(item.answer));
                JSON.parse(item.answer).forEach(ele => {
                  item.userAnswer.push({ content: "" });
                });
              }
            } else {
              item.userAnswer = JSON.parse(item.userAnswer);
              var userAnswer = this._.cloneDeep(item.userAnswer); //深克隆一下原数组用于循环
              item.userAnswer = [];
              userAnswer.forEach(ele => {
                item.userAnswer.push({ content: ele });
              });
            }
          } catch (e) {
            item.userAnswer = [];
            if (item.answer != "") {
              console.log(JSON.parse(item.answer));
              JSON.parse(item.answer).forEach(ele => {
                item.userAnswer.push({ content: "" });
              });
            }
          }
        });

        if (this.mode == 1) {
          // 背题模式材料分析题
          this.analysisList.forEach(item => {
            item.analysisSingleChoiceList = [];
            item.analysisMultipleChoiceList = [];
            item.analysisUndefinedChoiceList = [];
            item.analysisJudgeList = [];
            item.analysisGapList = [];
            item.analysisEssayList = [];
            item.childrenList.forEach(ele => {
              // ele.analysisShow = true;
              this.$set(ele, "analysisShow", true); //不能触发视图更新所以用它
              ele.userAnswer = ele.answer;
              if (ele.typeId == 1) {
                // 刷新页面材料分析题的userAnswer就消失了
                // 回显材料分析题答题卡
                if (ele.userAnswer != null) {
                  item.userAnswer = true;
                }
                item.analysisSingleChoiceList.push(ele);
              } else if (ele.typeId == 2) {
                item.analysisMultipleChoiceList.push(ele);

                // 材料分析题下多选题数据做处理
                item.analysisMultipleChoiceList.forEach(tem => {
                  try {
                    if (!tem.userAnswer) {
                      tem.userAnswer = [];
                    } else {
                      tem.userAnswer = JSON.parse(tem.userAnswer);
                    }
                  } catch (e) {
                    tem.userAnswer = [];
                  }
                });
                // 回显材料分析题
                if (ele.userAnswer.length > 0) {
                  item.userAnswer = true;
                }
              } else if (ele.typeId == 3) {
                item.analysisUndefinedChoiceList.push(ele);
              } else if (ele.typeId == 4) {
                item.analysisJudgeList.push(ele);

                // 回显材料分析题答题卡
                if (ele.userAnswer != null) {
                  item.userAnswer = true;
                }
              } else if (ele.typeId == 5) {
                item.analysisGapList.push(ele);

                // 材料分析题下填空题数据做处理
                item.analysisGapList.forEach(tem => {
                  try {
                    if (!tem.userAnswer) {
                      tem.userAnswer = [];
                      if (tem.answer != "") {
                        console.log(JSON.parse(tem.answer));
                        JSON.parse(tem.answer).forEach(ele => {
                          tem.userAnswer.push({ content: "" });
                        });
                      }
                    } else {
                      tem.userAnswer = JSON.parse(tem.userAnswer);
                      var userAnswer = this._.cloneDeep(tem.userAnswer); //深克隆一下原数组用于循环
                      tem.userAnswer = [];
                      userAnswer.forEach(ele => {
                        tem.userAnswer.push({ content: ele });
                      });
                    }
                  } catch (e) {
                    tem.userAnswer = [];
                    if (tem.answer != "") {
                      console.log(JSON.parse(tem.answer));
                      JSON.parse(tem.answer).forEach(ele => {
                        tem.userAnswer.push({ content: "" });
                      });
                    }
                  }
                });
              } else if (ele.typeId == 6) {
                item.analysisEssayList.push(ele);
              }
            });
          });
        } else {
          // 练习模式材料分析题子题
          this.analysisList.forEach(item => {
            item.analysisSingleChoiceList = [];
            item.analysisMultipleChoiceList = [];
            item.analysisUndefinedChoiceList = [];
            item.analysisJudgeList = [];
            item.analysisGapList = [];
            item.analysisEssayList = [];
            item.childrenList.forEach(ele => {
              // ele.analysisShow = false;
              this.$set(ele, "analysisShow", false); //不能触发视图更新所以用它
              if (ele.typeId == 1) {
                // 刷新页面材料分析题的userAnswer就消失了
                // 回显材料分析题答题卡
                if (ele.userAnswer != null) {
                  item.userAnswer = true;
                }
                item.analysisSingleChoiceList.push(ele);
              } else if (ele.typeId == 2) {
                item.analysisMultipleChoiceList.push(ele);

                // 材料分析题下多选题数据做处理
                item.analysisMultipleChoiceList.forEach(tem => {
                  try {
                    if (!tem.userAnswer) {
                      tem.userAnswer = [];
                    } else {
                      tem.userAnswer = JSON.parse(tem.userAnswer);
                    }
                  } catch (e) {
                    tem.userAnswer = [];
                  }
                });
                // 回显材料分析题
                if (ele.userAnswer.length > 0) {
                  item.userAnswer = true;
                }
              } else if (ele.typeId == 3) {
                item.analysisUndefinedChoiceList.push(ele);
              } else if (ele.typeId == 4) {
                item.analysisJudgeList.push(ele);

                // 回显材料分析题答题卡
                if (ele.userAnswer != null) {
                  item.userAnswer = true;
                }
              } else if (ele.typeId == 5) {
                item.analysisGapList.push(ele);

                // 材料分析题下填空题数据做处理
                item.analysisGapList.forEach(tem => {
                  try {
                    if (!tem.userAnswer) {
                      tem.userAnswer = [];
                      if (tem.answer != "") {
                        console.log(JSON.parse(tem.answer));
                        JSON.parse(tem.answer).forEach(ele => {
                          tem.userAnswer.push({ content: "" });
                        });
                      }
                    } else {
                      tem.userAnswer = JSON.parse(tem.userAnswer);
                      var userAnswer = this._.cloneDeep(tem.userAnswer); //深克隆一下原数组用于循环
                      tem.userAnswer = [];
                      userAnswer.forEach(ele => {
                        tem.userAnswer.push({ content: ele });
                      });
                    }
                  } catch (e) {
                    tem.userAnswer = [];
                    if (tem.answer != "") {
                      console.log(JSON.parse(tem.answer));
                      JSON.parse(tem.answer).forEach(ele => {
                        tem.userAnswer.push({ content: "" });
                      });
                    }
                  }
                });
              } else if (ele.typeId == 6) {
                item.analysisEssayList.push(ele);
              }
            });
          });
        }

        console.log(this.singleChoiceList, "单选题");
        console.log(this.multipleChoiceList, "多选题");
        console.log(this.undefinedChoiceList, "不定项选择题");
        console.log(this.judgeList, "判断题");
        console.log(this.gapList, "填空题");
        console.log(this.essayList, "问答题");
        console.log(this.analysisList, "材料分析题");
        console.log(this.analysisSingleChoiceList, "材料分析题下的单选题");
        console.log(this.analysisMultipleChoiceList, "材料分析题下的多选题");
        console.log(
          this.analysisUndefinedChoiceList,
          "材料分析题下的不定项选择题"
        );
        console.log(this.analysisJudgeList, "材料分析题下的判断题");
        console.log(this.analysisGapList, "材料分析题下的填空题");
        console.log(this.analysisEssayList, "材料分析题下的问答题");
        this.single = this.singleChoiceList.filter(ele => {
          return ele.userAnswer != null;
        });
        console.log(this.single.length, "单选已答数量");
        this.judge = this.judgeList.filter(ele => {
          return ele.userAnswer != null;
        });
        console.log(this.judge.length, "判断题已答数量");
        if (this.analysisList.length > 0) {
          this.analysis = this.analysisList.filter(ele => {
            if (ele.childrenList.length > 0) {
              return ele.userAnswer == true;
            }
          });
          console.log(this.analysis.length, "材料分析题已答数量");
        }

        this.gap = this.gapList.filter(ele => {
          return this.gapFun(ele.userAnswer).join("") != "";
        });
        console.log(this.gap.length, "填空题已答数量");
        this.multiple = this.multipleChoiceList.filter(ele => {
          return ele.userAnswer.length > 0;
        });
        console.log(this.multiple.length, "多选题已答数量");
        this.essay = this.essayList.filter(ele => {
          return ele.userAnswer != null;
        });
        console.log(this.essay.length, "问答题已答数量");
        this.finishLength =
          this.single.length +
          this.judge.length +
          this.analysis.length +
          this.gap.length +
          this.multiple.length +
          this.essay.length;
      });
      chapterAnswerSheet({
        lessonId: this.$route.query.lessonId
      }).then(res => {
        console.log(res, "答题卡"); //答题卡无分页
        this.total = res.data.length;
      });
    },
    // 单选和判断提交
    singleChoice(item, el) {
      if (el == undefined) {
        console.log(item, 888);
        chapterQuestionSubmit({
          answer: item.userAnswer,
          questionId: item.id
        }).then(res => {
          console.log(res, "单选题提交");
          item.analysisShow = true;
        });
        // console.log(
        //   this.analysisList,
        //   item.userAnswer,
        //   item.answer,
        //   item.userAnswer == item.answer,
        //   "单选题用户的答案"
        // );
      } else {
        if (el.typeId == 7) {
          el.userAnswer = true; //判断材料分析题是否答题
          chapterQuestionSubmit({
            answer: item.userAnswer,
            questionId: item.id
          }).then(res => {
            console.log(res, "材料分析题单选题提交");
            item.analysisShow = true;
            el.userAnswer = true; //判断材料分析题是否答题
            if (this.analysisList.length > 0) {
              this.analysis = this.analysisList.filter(ele => {
                if (ele.childrenList.length > 0) {
                  return ele.userAnswer == true;
                }
              });
              console.log(this.analysis.length, "材料分析题已答数量");
            }
          });
        }
      }
      this.single = this.singleChoiceList.filter(ele => {
        return ele.userAnswer != null;
      });
      console.log(this.single.length, "单选已答数量");
      this.judge = this.judgeList.filter(ele => {
        return ele.userAnswer != null;
      });
      console.log(this.judge.length, "判断题已答数量");
      this.finishLength =
        this.single.length +
        this.judge.length +
        this.analysis.length +
        this.gap.length +
        this.multiple.length +
        this.essay.length;
    },
    // 多选提交
    multipleChoice(item, el) {
      if (el == undefined) {
        item.userAnswer = item.userAnswer.sort();
        console.log(item.userAnswer);
        chapterQuestionSubmit({
          answer: JSON.stringify(item.userAnswer),
          questionId: item.id
        }).then(res => {
          console.log(res, "多选题提交");
          item.analysisShow = true;
        });
      } else {
        if (el.typeId == 7) {
          item.userAnswer = item.userAnswer.sort();
          console.log(item.userAnswer);
          chapterQuestionSubmit({
            answer: JSON.stringify(item.userAnswer),
            questionId: item.id
          }).then(res => {
            console.log(res, "材料分析题多选题提交");
            item.analysisShow = true;
            el.userAnswer = true; //判断材料分析题是否答题

            if (this.analysisList.length > 0) {
              this.analysis = this.analysisList.filter(ele => {
                if (ele.childrenList.length > 0) {
                  return ele.userAnswer == true;
                }
              });
              console.log(this.analysis.length, "材料分析题已答数量");
            }
          });
        }
      }

      this.multiple = this.multipleChoiceList.filter(ele => {
        return ele.userAnswer.length > 0;
      });
      console.log(this.multiple.length, "多选题已答数量");
      this.finishLength =
        this.single.length +
        this.judge.length +
        this.analysis.length +
        this.gap.length +
        this.multiple.length +
        this.essay.length;
      // console.log(
      //   item.userAnswer,
      //   item.answer,
      //   item.userAnswer.join(""),
      //   JSON.parse(item.answer).join(""),
      //   item.userAnswer.join("") == JSON.parse(item.answer).join(""),
      //   "多选题用户的答案"
      // );
    },
    // 填空题提交
    changeGap(item) {
      var userAnswer = [];
      item.userAnswer.forEach(ele => {
        userAnswer.push(ele.content);
      });
      chapterQuestionSubmit({
        answer: JSON.stringify(userAnswer),
        questionId: item.id
      }).then(res => {
        console.log(res, "填空题提交");
        item.analysisShow = true;
      });
      this.gap = this.gapList.filter(ele => {
        return this.gapFun(ele.userAnswer).join("") != "";
      });
      console.log(this.gap.length, "填空题已答数量");
      this.finishLength =
        this.single.length +
        this.judge.length +
        this.analysis.length +
        this.gap.length +
        this.multiple.length +
        this.essay.length;
    },
    // 问答题提交
    changeEssay(item) {
      chapterQuestionSubmit({
        answer: item.userAnswer,
        questionId: item.id
      }).then(res => {
        console.log(res, "问答题提交");
        item.analysisShow = true;
      });
      this.essay = this.essayList.filter(ele => {
        return ele.userAnswer != null;
      });
      console.log(this.essay.length, "问答题已答数量");
      this.finishLength =
        this.single.length +
        this.judge.length +
        this.analysis.length +
        this.gap.length +
        this.multiple.length +
        this.essay.length;
    },
    // 填空题填的答案判断是否与标准答案相等
    gapFun(item) {
      var arr = [];
      item.forEach(ele => {
        arr.push(ele.content);
      });
      return arr;
    },
    // 查看解析
    watchAnalysis(item) {
      if (!item.analysisShow) {
        item.analysisShow = true;
      } else {
        item.analysisShow = false;
      }
    },
    prev() {
      this.swiper.slidePrev();
    },
    next() {
      this.swiper.slideNext();
    },
    saveProgress() {
      this.saveDialog = true;
    },
    // 打开纠错弹窗
    openCorrect(item) {
      this.correctDialog = true;
      this.confirmId = item.id;
      this.confirmQuestionType = item.questionType;
      this.confirmLessonId = item.lessonId;
      this.confirmChapterId = item.chapterId;
      this.confirmCourseId = item.courseId;
    },
    correct(index) {
      this.correctTypeIndex = index;
    },
    cancel() {
      this.correctDialog = false;
    },
    // 关闭纠错弹窗的回调
    closeDialog() {
      this.correctTypeIndex = 0;
      this.extra = "";
    },
    confirm() {
      correction({
        questionId: this.confirmId,
        questionType: this.confirmQuestionType,
        type: this.correctTypeIndex,
        title: this.extra,
        lessonId: this.confirmLessonId,
        chapterId: this.confirmChapterId,
        courseId: this.confirmCourseId
      }).then(res => {
        if (res.code === 0 && res.data) {
          this.$message({
            message: "纠错成功",
            type: "success"
          });
          this.correctDialog = false;
        }
      });
    },
    // 收藏
    myCollect() {
      if (this.isCollect) {
        this.isCollect = false;
      } else {
        this.isCollect = true;
      }
    },
    // 标记
    mySign() {
      if (this.isSign) {
        this.isSign = false;
      } else {
        this.isSign = true;
      }
    },
    // 练习模式
    exerciseMode() {
      location.reload();
      this.mode = 0;
    },
    // 背题模式
    finishMode() {
      this.mode = 1;
      this.init();
    }
  }
};
</script>
<style lang="scss" scoped>
.practice {
  width: 1200px;
  margin: 0 auto;
  .swiper-slide {
    padding-top: 10px;
  }
  // 提交进度弹窗
  .saveDia {
    /deep/ .el-dialog__header {
      text-align: center;
      .el-dialog__title {
        font-size: 18px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #333333;
      }
    }
    .save {
      p {
        text-align: center;
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #888888;
        span {
          color: #e82020;
        }
      }
      .btns {
        height: 45px;
        display: flex;
        padding: 0 30px;
        justify-content: space-between;
        margin-top: 58px;
        .continue {
          width: 180px;
          height: 45px;
          background: #f5f5f5;
          border-radius: 4px;
          text-align: center;
          line-height: 45px;
          font-size: 16px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #999999;
          &:hover {
            cursor: pointer;
          }
        }
        .noContinue {
          width: 180px;
          height: 45px;
          background: #17a5f2;
          border-radius: 4px;
          font-size: 16px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #ffffff;
          text-align: center;
          line-height: 45px;
          &:hover {
            cursor: pointer;
          }
        }
      }
    }
    .correctBox {
      padding: 0 30px;
      p {
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #999999;
        margin-top: -30px;
        text-align: center;
      }
      .correctType {
        margin-top: 50px;
        .label {
          text-align: left;
          font-size: 16px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #888888;
        }
        ul {
          display: flex;
          flex-wrap: wrap;
          li {
            height: 42px;
            text-align: center;
            line-height: 42px;
            background: #f5f5f5;
            border-radius: 4px;
            font-size: 16px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #888888;
            padding: 0px 15px;
            margin-right: 10px;
            margin-top: 10px;
            &:hover {
              cursor: pointer;
            }
            &.active {
              color: #ffffff;
              background: #17a5f2;
            }
          }
        }
        /deep/ .el-textarea__inner {
          background-color: #f5f5f5;
        }
        .btns {
          height: 45px;
          display: flex;
          justify-content: space-between;
          margin-top: 30px;
          .cancel {
            width: 180px;
            height: 45px;
            background: #eeeeee;
            border-radius: 4px;
            line-height: 45px;
            text-align: center;
            font-size: 16px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #999999;
            &:hover {
              cursor: pointer;
            }
          }
          .confirm {
            width: 180px;
            height: 45px;
            background: #17a5f2;
            border-radius: 4px;
            line-height: 45px;
            text-align: center;
            font-size: 16px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #ffffff;
            &:hover {
              cursor: pointer;
            }
          }
        }
      }
    }
  }

  .Breadcrumb {
    height: 20px;
    margin: 20px 0;
    display: flex;
    align-items: center;
    img {
      margin-right: 8px;
    }
    span {
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #888888;
    }
  }
  .content {
    display: flex;
    justify-content: space-between;
    margin-bottom: 40px;
    .content-l {
      width: 836px;
      padding: 24px 30px;
      background: #fff;
      border-radius: 4px;
      position: relative;
      overflow: hidden;
      .prev {
        width: 46px;
        height: 100px;
        border: 1px solid #17a5f2;
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #17a5f2;
        position: absolute;
        right: 0px;
        top: 390px;
        writing-mode: tb-rl;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
        &:hover {
          cursor: pointer;
        }
      }
      .next {
        width: 48px;
        height: 102px;
        background: #17a5f2;
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #fff;
        position: absolute;
        right: 0px;
        top: 510px;
        writing-mode: tb-rl;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
        &:hover {
          cursor: pointer;
        }
      }
      // 多选样式
      .el-checkbox {
        white-space: pre-wrap; //强制换行
        min-height: 30px;
        line-height: 30px;
        display: block;
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #333333;
      }
      /deep/ .el-checkbox__label {
        display: inline;
      }
      // 填空题样式
      /deep/ .el-input__inner {
        border: none;
        border-bottom: 1px solid #dcdfe6;
        border-radius: 0px;
      }
      // 单选样式自定义
      .el-radio-group {
        padding-left: 22px;
        max-width: 800px;
      }
      .el-radio {
        white-space: pre-wrap; //强制换行
        min-height: 30px;
        line-height: 30px;
        display: block;
        /deep/ .el-radio__input {
          display: none;
        }
        /deep/ .el-radio__label {
          padding-left: 20px;
          font-size: 16px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #333;
        }
        &:after {
          content: "";
          display: block;
          width: 20px;
          height: 20px;
          border: 1px solid #c4c4c4;
          border-radius: 50%;
          position: absolute;
          left: -16px;
          top: 4px;
        }
        &.is-checked {
          position: relative;
          &:after {
            content: "";
            display: block;
            height: 20px;
            width: 20px;
            background: url("../../assets/images/questionBank/true.png");
            background-size: 100%;
            position: absolute;
            left: -16px;
            // border-color: transparent;
            top: 4px;
          }
        }
        &.error {
          position: relative;
          &:after {
            content: "";
            display: block;
            height: 20px;
            width: 20px;
            background: url("../../assets/images/questionBank/error.png");
            background-size: 100%;
            position: absolute;
            // border-color: transparent;
            left: -16px;
            top: 4px;
          }
        }
      }
      .analysis {
        margin-top: 10px;
        min-height: 45px;
        background: #f6f6f6;
        border-radius: 4px;
        padding: 0 20px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .analysisContent {
          padding: 5px 0 30px;
          width: 100%;
          border-top: 1px solid #e4e4e4;
          .myAnswer {
            display: flex;
            align-items: center;
            height: 30px;
            font-size: 16px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #999999;
            .myAnswer-l {
              width: 86px;
            }
          }
          .referenceAnswer {
            display: flex;
            align-items: center;
            height: 30px;
            font-size: 16px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #999999;
            .referenceAnswer-l {
              width: 86px;
            }
          }
          .answerResult {
            display: flex;
            font-size: 16px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #999999;
            .answerResult-l {
              min-width: 86px;
              display: flex;
              justify-content: space-between;
            }
          }
        }
        .analysis-l {
          height: 45px;
          display: flex;
          .jiucuo {
            height: 45px;
            display: flex;
            align-items: center;
            &:hover {
              cursor: pointer;
            }
            span {
              margin-left: 8px;
              font-size: 14px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: #888888;
            }
          }
          .collect {
            margin-left: 20px;
            height: 45px;
            display: flex;
            align-items: center;
            &:hover {
              cursor: pointer;
            }
            span {
              margin-left: 8px;
              font-size: 14px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: #888888;
            }
          }
          .sign {
            margin-left: 20px;
            height: 45px;
            display: flex;
            align-items: center;
            &:hover {
              cursor: pointer;
            }
            span {
              margin-left: 8px;
              font-size: 14px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: #888888;
            }
          }
        }
        .analysis-r {
          height: 45px;
          display: flex;
          align-items: center;
          &:hover {
            cursor: pointer;
          }
          span {
            margin-right: 10px;
            font-size: 16px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #17a5f2;
          }
        }
      }
      .questionType {
        background: #17a5f2;
        border-radius: 4px;
        padding: 8px 12px;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #ffffff;
      }
      p {
        margin: 20px 0;
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #333333;
        padding-left: 10px;
        span {
          font-size: 18px;
          font-weight: bold;
          margin-right: 8px;
        }
      }
    }
    .content-r {
      width: 288px;
      .answerSheet-t {
        width: 240px;
        height: 125px;
        background: #ffffff;
        border-radius: 4px;
        padding: 24px;
        .progress {
          display: flex;
          justify-content: space-between;
          align-items: center;
          span {
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #333333;
          }
        }
        // 进度条样式修改
        /deep/ .el-progress-bar {
          padding-right: 0px;
        }
        /deep/ .el-progress__text {
          display: none;
        }
        .btns {
          margin-top: 44px;
          width: 240px;
          height: 38px;
          border: 1px solid #17a5f2;
          line-height: 40px;
          border-radius: 4px;
          display: flex;
          .pra-btn {
            width: 120px;
            background: #17a5f2;
            font-size: 16px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #ffffff;
            text-align: center;
            &:hover {
              cursor: pointer;
            }
          }
          .bt-btn {
            width: 120px;
            text-align: center;
            font-size: 16px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #17a5f2;
            &:hover {
              cursor: pointer;
            }
          }
        }
      }
      .answerSheet {
        // height: 630px;
        width: 240px;
        margin-top: 10px;
        background: #ffffff;
        border-radius: 4px;
        padding: 0 24px 30px;
        .title {
          height: 58px;
          border-bottom: 1px solid #f5f5f5;
          display: flex;
          align-items: center;
          font-size: 18px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #333333;
        }
        .typeQues {
          div {
            margin: 20px 0;
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #888888;
          }
          ul {
            display: flex;
            flex-wrap: wrap;
            li {
              width: 34px;
              height: 26px;
              background: #ffffff;
              border: 1px solid #c4c4c4;
              border-radius: 4px;
              text-align: center;
              line-height: 28px;
              font-size: 16px;
              font-family: Arial;
              font-weight: 400;
              color: #333333;
              margin-right: 7px;
              margin-bottom: 7px;
              &.finish {
                width: 36px;
                height: 28px;
                background: #17a5f1;
                color: #fff;
                border: none;
              }
              &:hover {
                cursor: pointer;
              }
            }
          }
        }
        .bottom {
          margin-top: 20px;
          height: 102px;
          border-top: 1px solid #f5f5f5;
          .tips {
            margin-top: 20px;
            height: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .tipone {
              height: 20px;
              display: flex;
              align-items: center;
              span {
                font-size: 14px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: #333333;
                margin-left: 9px;
              }
            }
          }
          .saveProgress {
            margin-top: 20px;
            width: 240px;
            height: 46px;
            background: #17a5f2;
            border-radius: 4px;
            font-size: 16px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #ffffff;
            text-align: center;
            line-height: 46px;
            &:hover {
              cursor: pointer;
            }
          }
        }
      }
    }
  }
}
</style>

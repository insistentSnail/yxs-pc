<template>
  <div class="exam">
    <div class="Breadcrumb">
      <img src="@/assets/images/questionBank/location.png" alt="" />
      <span>{{ $route.query.name }} > </span>
      <span> {{ $route.query.type }} > </span>
      <span style="color:#333333">{{ $route.query.title }}</span>
    </div>
    <div class="examContent">
      <div class="examContent-l">
        <div class="info">
          <div class="info-t">
            <img src="@/assets/images/questionBank/lnzt.png" alt="" />
            <div class="title">
              <p>{{ $route.query.title }}</p>
              <p>
                <span
                  >总分：{{ examInfo.score }}分，共{{
                    examInfo.itemCount
                  }}题</span
                >
                <span style="margin-left:30px"
                  >答题限时：{{ examInfo.limitTime }}分钟</span
                >
              </p>
            </div>
          </div>
          <div class="info-b">考试说明：{{ examInfo.description }}</div>
        </div>
        <!-- 题型切换 -->
        <div class="questionType">
          <ul>
            <li
              v-for="(item, index) in questionLists"
              :key="index"
              @click="currentIndex(index)"
            >
              <a
                v-if="index == 0"
                :class="questionIndex == index ? 'active' : ''"
                href="#sing"
              >
                {{ item }}
              </a>
              <a
                v-if="index == 1"
                :class="questionIndex == index ? 'active' : ''"
                href="#double"
              >
                {{ item }}
              </a>
              <a
                v-if="index == 2"
                :class="questionIndex == index ? 'active' : ''"
                href="#judge"
              >
                {{ item }}
              </a>
              <a
                v-if="index == 3"
                :class="questionIndex == index ? 'active' : ''"
                href="#tian"
              >
                {{ item }}
              </a>
              <a
                v-if="index == 4"
                :class="questionIndex == index ? 'active' : ''"
                href="#wen"
              >
                {{ item }}
              </a>
              <a
                v-if="index == 5"
                :class="questionIndex == index ? 'active' : ''"
                href="#cai"
              >
                {{ item }}
              </a>
            </li>
          </ul>
        </div>

        <!-- 主体内容 -->
        <div class="question-c">
          <!-- 单选题 -->
          <div
            class="singleChoise"
            id="sing"
            v-if="singleChoiceList.length > 0"
          >
            <div class="singleTitle">
              <div class="singleType">单选题</div>
              <!-- <div class="score">（共10题，共20分）</div> -->
            </div>
            <div
              class="ques"
              v-for="(item, index) in singleChoiceList"
              :key="index"
              :id="'single' + index"
            >
              <p>
                <span class="order">{{ index + 1 }}.</span>
                <span class="editor" v-html="item.content"></span>
                <span class="scoreNum">（{{ item.score }}分）</span>
              </p>
              <el-radio-group
                @change="singleChoice(item)"
                v-model="item.userAnswer"
                v-for="(ele, idx) in JSON.parse(item.optionsContent)"
                :key="idx"
              >
                <el-radio :label="ele.name"
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
                        item.correctDialog
                          ? require('@/assets/images/questionBank/jiucuoActive.png')
                          : require('@/assets/images/questionBank/jiucuo.png')
                      "
                      alt=""
                    />
                    <span :style="item.correctDialog ? 'color:#FFA900' : ''"
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
              </div>
            </div>
          </div>
          <!-- 多选题 -->
          <div
            class="singleChoise"
            v-if="multipleChoiceList.length > 0"
            id="double"
            style="margin-top:30px"
          >
            <div class="singleTitle">
              <div class="singleType">多选题</div>
              <!-- <div class="score">（共5题，共20分）</div> -->
            </div>
            <div
              class="ques"
              v-for="(item, index) in multipleChoiceList"
              :key="item.id"
              :id="'multiple' + index"
            >
              <p>
                <span class="order"
                  >{{ singleChoiceList.length + index + 1 }}.</span
                >
                <span class="editor" v-html="item.content"></span>
                <span class="scoreNum">（{{ item.score }}分）</span>
              </p>
              <el-checkbox-group
                v-model="item.userAnswer"
                @change="multipleChoice(item)"
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

              <div class="analysis">
                <div class="analysis-l">
                  <div class="jiucuo" @click="openCorrect(item)">
                    <img
                      :src="
                        item.correctDialog
                          ? require('@/assets/images/questionBank/jiucuoActive.png')
                          : require('@/assets/images/questionBank/jiucuo.png')
                      "
                      alt=""
                    />
                    <span :style="item.correctDialog ? 'color:#FFA900' : ''"
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
              </div>
            </div>
          </div>
          <!-- 判断题 -->
          <div
            class="singleChoise"
            v-if="judgeList.length > 0"
            id="judge"
            style="margin-top:30px"
          >
            <div class="singleTitle">
              <div class="singleType">判断题</div>
              <!-- <div class="score">（共10题，共20分）</div> -->
            </div>
            <div
              class="ques"
              v-for="(item, index) in judgeList"
              :key="index"
              :id="'judge' + index"
            >
              <p>
                <span class="order"
                  >{{
                    singleChoiceList.length +
                      multipleChoiceList.length +
                      index +
                      1
                  }}.</span
                >
                {{ item.content }}
                <span class="scoreNum">（{{ item.score }}分）</span>
              </p>
              <el-radio-group
                v-model="item.userAnswer"
                @change="singleChoice(item)"
              >
                <el-radio label="true">A. 正确</el-radio>
                <el-radio label="false">B. 错误</el-radio>
              </el-radio-group>

              <div class="analysis">
                <div class="analysis-l">
                  <div class="jiucuo" @click="openCorrect(item)">
                    <img
                      :src="
                        item.correctDialog
                          ? require('@/assets/images/questionBank/jiucuoActive.png')
                          : require('@/assets/images/questionBank/jiucuo.png')
                      "
                      alt=""
                    />
                    <span :style="item.correctDialog ? 'color:#FFA900' : ''"
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
              </div>
            </div>
          </div>
          <!-- 填空题 -->
          <div
            class="singleChoise"
            v-if="gapList.length > 0"
            id="tian"
            style="margin-top:30px"
          >
            <div class="singleTitle">
              <div class="singleType">填空题</div>
              <!-- <div class="score">（共5题，共20分）</div> -->
            </div>
            <div
              class="ques"
              v-for="(item, index) in gapList"
              :key="item.id"
              :id="'gap' + index"
            >
              <p>
                <span class="order"
                  >{{
                    singleChoiceList.length +
                      multipleChoiceList.length +
                      judgeList.length +
                      index +
                      1
                  }}.</span
                >
                {{ item.content }}
                <span style="color:#999999;font-size:14px"
                  >（{{ item.score }}分）</span
                >
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
                  @change="changeGap(item)"
                  v-model="ele.content"
                  placeholder="请输入您的答案"
                ></el-input>
              </div>

              <div class="analysis">
                <div class="analysis-l">
                  <div class="jiucuo" @click="openCorrect(item)">
                    <img
                      :src="
                        item.correctDialog
                          ? require('@/assets/images/questionBank/jiucuoActive.png')
                          : require('@/assets/images/questionBank/jiucuo.png')
                      "
                      alt=""
                    />
                    <span :style="item.correctDialog ? 'color:#FFA900' : ''"
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
              </div>
            </div>
          </div>
          <!-- 问答题 -->
          <div
            class="singleChoise"
            v-if="essayList.length > 0"
            id="wen"
            style="margin-top:30px"
          >
            <div class="singleTitle">
              <div class="singleType">问答题</div>
              <!-- <div class="score">（共5题，共20分）</div> -->
            </div>
            <div
              class="ques"
              v-for="(item, index) in essayList"
              :key="item.id"
              :id="'essay' + index"
            >
              <p>
                <span class="order"
                  >{{
                    singleChoiceList.length +
                      multipleChoiceList.length +
                      judgeList.length +
                      gapList.length +
                      index +
                      1
                  }}.</span
                >
                {{ item.content
                }}<span style="font-size:14px;color:#999"
                  >（{{ item.score }}分）</span
                >
              </p>
              <div>
                <el-input
                  @change="changeEssay(item)"
                  type="textarea"
                  :rows="4"
                  placeholder=""
                  v-model="item.userAnswer"
                >
                </el-input>
              </div>

              <div class="analysis">
                <div class="analysis-l">
                  <div class="jiucuo" @click="openCorrect(item)">
                    <img
                      :src="
                        item.correctDialog
                          ? require('@/assets/images/questionBank/jiucuoActive.png')
                          : require('@/assets/images/questionBank/jiucuo.png')
                      "
                      alt=""
                    />
                    <span :style="item.correctDialog ? 'color:#FFA900' : ''"
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
              </div>
            </div>
          </div>
          <!-- 材料分析题 -->
          <div
            class="singleChoise"
            v-if="analysisList.length > 0"
            id="cai"
            style="margin-top:30px"
          >
            <div class="singleTitle">
              <div class="singleType">材料分析题</div>
              <!-- <div class="score">（共5题，共20分）</div> -->
            </div>
            <div
              class="ques"
              v-for="(el, index) in analysisList"
              :key="el.id"
              :id="'analysis' + index"
            >
              <p>
                <span class="order"
                  >{{
                    singleChoiceList.length +
                      multipleChoiceList.length +
                      judgeList.length +
                      gapList.length +
                      essayList.length +
                      index +
                      1
                  }}.</span
                >
                {{ el.content }}
              </p>
              <p
                style="font-size: 16px;font-family: Microsoft YaHei;font-weight: 400;color: #888888;"
              >
                请认真阅读上述材料，完成以下题目：
              </p>
              <div class="material">
                <!-- 单选题 -->
                <div
                  class="materialItem"
                  v-for="(item, index) in el.analysisSingleChoiceList"
                  :key="item.id"
                >
                  <div class="material-t">
                    <div class="materialTitle">单选题</div>
                    <span
                      >（{{ index + 1 }}）
                      <span class="editor" v-html="item.content"></span>
                    </span>
                    <span class="materialScore"> （{{ item.score }}分） </span>
                  </div>
                  <el-radio-group
                    style="margin-top:10px"
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
                            item.correctDialog
                              ? require('@/assets/images/questionBank/jiucuoActive.png')
                              : require('@/assets/images/questionBank/jiucuo.png')
                          "
                          alt=""
                        />
                        <span :style="item.correctDialog ? 'color:#FFA900' : ''"
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
                        <span :style="isCollect ? 'color:#17A5F2' : ''"
                          >收藏</span
                        >
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
                  </div>
                </div>
                <!-- 多选题 -->
                <div
                  class="materialItem"
                  v-for="(item, index) in el.analysisMultipleChoiceList"
                  :key="item.id"
                >
                  <div class="material-t">
                    <div class="materialTitle">多选题</div>
                    <span
                      >（{{ el.analysisSingleChoiceList.length + index + 1 }}）
                      <span class="editor" v-html="item.content"></span>
                    </span>
                    <span class="materialScore"> （{{ item.score }}分） </span>
                  </div>
                  <el-checkbox-group
                    v-model="item.userAnswer"
                    @change="multipleChoice(item, el)"
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

                  <div class="analysis">
                    <div class="analysis-l">
                      <div class="jiucuo" @click="openCorrect(item)">
                        <img
                          :src="
                            item.correctDialog
                              ? require('@/assets/images/questionBank/jiucuoActive.png')
                              : require('@/assets/images/questionBank/jiucuo.png')
                          "
                          alt=""
                        />
                        <span :style="item.correctDialog ? 'color:#FFA900' : ''"
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
                        <span :style="isCollect ? 'color:#17A5F2' : ''"
                          >收藏</span
                        >
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
                  </div>
                </div>
                <!-- 判断题 -->
                <div
                  class="materialItem"
                  v-for="(item, index) in el.analysisJudgeList"
                  :key="item.id"
                >
                  <div class="material-t">
                    <div class="materialTitle">判断题</div>
                    <span
                      >（{{
                        el.analysisSingleChoiceList.length +
                          el.analysisMultipleChoiceList.length +
                          index +
                          1
                      }}）{{ item.content }}</span
                    >
                    <span class="materialScore"> （{{ item.score }}分） </span>
                  </div>
                  <el-radio-group
                    style="margin-top:10px"
                    v-model="item.userAnswer"
                    @change="singleChoice(item, el)"
                  >
                    <el-radio label="true">A. 正确</el-radio>
                    <el-radio label="false">B. 错误</el-radio>
                  </el-radio-group>

                  <div class="analysis">
                    <div class="analysis-l">
                      <div class="jiucuo" @click="openCorrect(item)">
                        <img
                          :src="
                            item.correctDialog
                              ? require('@/assets/images/questionBank/jiucuoActive.png')
                              : require('@/assets/images/questionBank/jiucuo.png')
                          "
                          alt=""
                        />
                        <span :style="item.correctDialog ? 'color:#FFA900' : ''"
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
                        <span :style="isCollect ? 'color:#17A5F2' : ''"
                          >收藏</span
                        >
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
                  </div>
                </div>
                <!-- 填空题 -->
                <div
                  class="materialItem"
                  v-for="(item, index) in el.analysisGapList"
                  :key="item.id"
                >
                  <div class="material-t">
                    <div class="materialTitle">填空题</div>
                    <span
                      >（{{
                        el.analysisSingleChoiceList.length +
                          el.analysisMultipleChoiceList.length +
                          el.analysisJudgeList.length +
                          index +
                          1
                      }}）{{ item.content }}</span
                    >
                    <span class="materialScore"> （{{ item.score }}分） </span>
                  </div>
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
                      @change="changeGap(item)"
                      v-model="ele.content"
                      placeholder="请输入您的答案"
                    ></el-input>
                  </div>

                  <div class="analysis">
                    <div class="analysis-l">
                      <div class="jiucuo" @click="openCorrect(item)">
                        <img
                          :src="
                            item.correctDialog
                              ? require('@/assets/images/questionBank/jiucuoActive.png')
                              : require('@/assets/images/questionBank/jiucuo.png')
                          "
                          alt=""
                        />
                        <span :style="item.correctDialog ? 'color:#FFA900' : ''"
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
                        <span :style="isCollect ? 'color:#17A5F2' : ''"
                          >收藏</span
                        >
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
                  </div>
                </div>
                <!-- 问答题 -->
                <div
                  class="materialItem"
                  v-for="(item, index) in el.analysisEssayList"
                  :key="item.id"
                >
                  <div class="material-t">
                    <div class="materialTitle">问答题</div>
                    <span
                      >（{{
                        el.analysisSingleChoiceList.length +
                          el.analysisMultipleChoiceList.length +
                          el.analysisJudgeList.length +
                          el.analysisGapList.length +
                          index +
                          1
                      }}）{{ item.content }}</span
                    >
                    <span class="materialScore"> （{{ item.score }}分） </span>
                  </div>

                  <el-input
                    @change="changeEssay(item)"
                    type="textarea"
                    :rows="4"
                    placeholder=""
                    v-model="item.userAnswer"
                  ></el-input>

                  <div class="analysis">
                    <div class="analysis-l">
                      <div class="jiucuo" @click="openCorrect(item)">
                        <img
                          :src="
                            item.correctDialog
                              ? require('@/assets/images/questionBank/jiucuoActive.png')
                              : require('@/assets/images/questionBank/jiucuo.png')
                          "
                          alt=""
                        />
                        <span :style="item.correctDialog ? 'color:#FFA900' : ''"
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
                        <span :style="isCollect ? 'color:#17A5F2' : ''"
                          >收藏</span
                        >
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="examContent-r">
        <div class="countDown">
          <div class="countDown-t">
            <img src="@/assets/images/questionBank/countDown.png" alt="" />
            <p>
              剩余时间：
              <van-count-down :time="timeLeft" />
              <!-- <span>{{ time }}</span> -->
            </p>
          </div>
          <div class="submitPaper" @click="handExam()">交卷</div>
          <div class="savePaper" @click="saveProgress">保存进度，下次继续</div>
        </div>

        <!-- 答题卡 -->
        <div class="answerSheet">
          <p class="title">
            答题卡 <span>{{ finishLength }}/{{ examInfo.itemCount }}</span>
          </p>
          <div class="typeQues" v-show="singleChoiceList.length > 0">
            <div>单选题</div>
            <ul>
              <li v-for="(item, index) in singleChoiceList" :key="index">
                <a
                  :class="item.userAnswer ? 'finish' : ''"
                  :href="'#single' + index"
                >
                  {{ index + 1 }}</a
                >
              </li>
            </ul>
          </div>

          <div class="typeQues" v-show="multipleChoiceList.length > 0">
            <div>多选题</div>
            <ul>
              <li v-for="(item, index) in multipleChoiceList" :key="index">
                <a
                  :class="item.userAnswer.length > 0 ? 'finish' : ''"
                  :href="'#multiple' + index"
                >
                  {{ singleChoiceList.length + index + 1 }}</a
                >
              </li>
            </ul>
          </div>

          <div class="typeQues" v-show="judgeList.length > 0">
            <div>判断题</div>
            <ul>
              <li v-for="(item, index) in judgeList" :key="index">
                <a
                  :class="item.userAnswer ? 'finish' : ''"
                  :href="'#judge' + index"
                >
                  {{
                    singleChoiceList.length +
                      multipleChoiceList.length +
                      undefinedChoiceList.length +
                      index +
                      1
                  }}</a
                >
              </li>
            </ul>
          </div>

          <div class="typeQues" v-show="gapList.length > 0">
            <div>填空题</div>
            <ul>
              <li v-for="(item, index) in gapList" :key="index">
                <a
                  :class="
                    gapFun(item.userAnswer).join('') == '' ? '' : 'finish'
                  "
                  :href="'#gap' + index"
                >
                  {{
                    singleChoiceList.length +
                      multipleChoiceList.length +
                      undefinedChoiceList.length +
                      judgeList.length +
                      index +
                      1
                  }}</a
                >
              </li>
            </ul>
          </div>

          <div class="typeQues" v-show="essayList.length > 0">
            <div>问答题</div>
            <ul>
              <li v-for="(item, index) in essayList" :key="index">
                <a
                  :class="item.userAnswer ? 'finish' : ''"
                  :href="'#essay' + index"
                >
                  {{
                    singleChoiceList.length +
                      multipleChoiceList.length +
                      undefinedChoiceList.length +
                      judgeList.length +
                      gapList.length +
                      index +
                      1
                  }}</a
                >
              </li>
            </ul>
          </div>

          <div class="typeQues" v-show="analysisList.length > 0">
            <div>材料分析题</div>
            <ul>
              <li v-for="(item, index) in analysisList" :key="index">
                <a
                  v-if="item.childrenList.length > 0"
                  :class="item.userAnswer == true ? 'finish' : ''"
                  :href="'#analysis' + index"
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
                  }}</a
                >
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
          </div>
        </div>
      </div>
    </div>

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

    <!-- 交卷弹窗 -->
    <el-dialog
      class="saveDia"
      width="480px"
      title="确认信息"
      :visible.sync="handExamDialog"
    >
      <div class="handExamBox">
        <p v-if="finishLength == examInfo.itemCount">
          您已完成全部试题，是否确定交卷？
        </p>
        <p v-else>
          您还有
          <span>{{ examInfo.itemCount - finishLength }}</span>
          道题未做，确定要提交试卷吗？
        </p>
        <div class="btns">
          <div class="cancel" @click="cancelHandExam">
            {{ finishLength == examInfo.itemCount ? "检查一下" : "取消" }}
          </div>
          <div class="submit" @click="submitHandExam">确认交卷</div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  examQuestions,
  examQuestionSubmit,
  examTip,
  examSubmit,
  correction
} from "@/api/questionBank/questionBank.js";
export default {
  name: "Exam",
  data() {
    return {
      questionLists: [
        "单选题",
        "多选题",
        "判断题",
        "填空题",
        "问答题",
        "材料分析题"
      ],
      questionIndex: null,
      correctDialog: false, //纠错弹窗
      handExamDialog: false, //交卷弹窗
      correctTypeIndex: 0,
      extra: "",
      isCollect: false, //是否收藏
      isSign: false, //是否标记
      finish: false,
      singleChoiceList: [], // 单选题目
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
      examPaperId: "",
      resultId: "",
      needMarking: "",
      timeLeft: "",
      time: "",
      examInfo: "考试简介",
      finishLength: 0, //已答题的数量
      single: [],
      judge: [],
      analysis: [],
      gap: [],
      multiple: [],
      essay: []
    };
  },
  created() {
    this.examPaperId = this.$route.query.id; //试卷id
    this.init();
    examTip({
      id: this.examPaperId
    }).then(res => {
      console.log(res, "考试倒计时");
      this.examInfo = res.data;
    });
  },
  methods: {
    // formatSeconds(value) {
    //   var theTime = parseInt(value); // 秒
    //   var middle = 0; // 分
    //   var hour = 0; // 小时

    //   if (theTime > 60) {
    //     middle = parseInt(theTime / 60);
    //     theTime = parseInt(theTime % 60);
    //     if (middle > 60) {
    //       hour = parseInt(middle / 60);
    //       middle = parseInt(middle % 60);
    //     }
    //   }
    //   var result = "" + parseInt(theTime);
    //   if (middle > 0) {
    //     result = "00:" + parseInt(middle) + ":" + result;
    //   }
    //   if (hour > 0) {
    //     result = "" + parseInt(hour) + ":" + result;
    //   }
    //   return result;
    // },
    init() {
      examQuestions({
        id: this.$route.query.id
      }).then(res => {
        console.log(res, "考试题目");
        this.resultId = res.data.examResult.id;
        this.needMarking = res.data.needMarking;
        // 考试剩余时间
        if (res.data.examResult.updateTime == null) {
          this.timeLeft =
            Date.parse(new Date(res.data.examResult.endTime)) -
            Date.parse(new Date(res.data.examResult.createTime));
        } else {
          this.timeLeft =
            Date.parse(new Date(res.data.examResult.endTime)) -
            Date.parse(new Date(res.data.examResult.updateTime));
        }

        // this.time = this.formatSeconds(this.timeLeft / 1000);
        console.log("考试剩余时间", this.timeLeft);
        res.data.questionList.forEach(ele => {
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

        // 材料分析题子题
        this.analysisList.forEach(item => {
          // 练习的材料分析题存在问题
          item.analysisSingleChoiceList = [];
          item.analysisMultipleChoiceList = [];
          item.analysisUndefinedChoiceList = [];
          item.analysisJudgeList = [];
          item.analysisGapList = [];
          item.analysisEssayList = [];
          if (item.childrenList.length > 0) {
            item.childrenList.forEach(ele => {
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
          }
        });

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
    },
    // 单选题 和 判断提交
    singleChoice(item, el) {
      if (el == undefined) {
        console.log(item, 888);
        examQuestionSubmit({
          answer: item.userAnswer,
          questionId: item.id,
          examPaperId: this.examPaperId,
          resultId: this.resultId,
          score: item.score,
          typeId: item.typeId,
          parentId: item.parentId,
          refAnswer: item.answer
        }).then(res => {
          console.log(res, "单选题提交");
        });
      } else {
        if (el.typeId == 7) {
          examQuestionSubmit({
            answer: item.userAnswer,
            questionId: item.id,
            examPaperId: this.examPaperId,
            resultId: this.resultId,
            score: item.score,
            typeId: item.typeId,
            parentId: item.parentId,
            refAnswer: item.answer
          }).then(res => {
            console.log(res, "材料分析题单选题提交");
            el.userAnswer = true; //判断材料分析题是否答题
          });
          console.log(this.analysisList, "材料分析题");
          if (this.analysisList.length > 0) {
            this.analysis = this.analysisList.filter(ele => {
              if (ele.childrenList.length > 0) {
                return ele.userAnswer == true;
              }
            });
            console.log(this.analysis.length, "材料分析题已答数量");
          }
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
        examQuestionSubmit({
          answer: JSON.stringify(item.userAnswer),
          questionId: item.id,
          examPaperId: this.examPaperId,
          resultId: this.resultId,
          score: item.score,
          typeId: item.typeId,
          parentId: item.parentId,
          refAnswer: item.answer
        }).then(res => {
          console.log(res, "多选题提交");
        });
      } else {
        if (el.typeId == 7) {
          item.userAnswer = item.userAnswer.sort();
          console.log(item.userAnswer);
          examQuestionSubmit({
            answer: JSON.stringify(item.userAnswer),
            questionId: item.id,
            examPaperId: this.examPaperId,
            resultId: this.resultId,
            score: item.score,
            typeId: item.typeId,
            parentId: item.parentId,
            refAnswer: item.answer
          }).then(res => {
            console.log(res, "材料分析多选题提交");
            el.userAnswer = true; //判断材料分析题是否答题
          });
          if (this.analysisList.length > 0) {
            this.analysis = this.analysisList.filter(ele => {
              if (ele.childrenList.length > 0) {
                return ele.userAnswer == true;
              }
            });
            console.log(this.analysis.length, "材料分析题已答数量");
          }
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
    },
    // 填空题提交
    changeGap(item) {
      var userAnswer = [];
      item.userAnswer.forEach(ele => {
        userAnswer.push(ele.content);
      });
      examQuestionSubmit({
        answer: JSON.stringify(userAnswer),
        questionId: item.id,
        examPaperId: this.examPaperId,
        resultId: this.resultId,
        score: item.score,
        typeId: item.typeId,
        parentId: item.parentId,
        refAnswer: item.answer
      }).then(res => {
        console.log(res, "填空题提交");
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
      examQuestionSubmit({
        answer: item.userAnswer,
        questionId: item.id,
        examPaperId: this.examPaperId,
        resultId: this.resultId,
        score: item.score,
        typeId: item.typeId,
        parentId: item.parentId,
        refAnswer: item.answer
      }).then(res => {
        console.log(res, "问答题提交");
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
    currentIndex(index) {
      this.questionIndex = index;
    },
    // 打开纠错弹窗
    openCorrect(item) {
      item.correctDialog = true;
      this.correctDialog = true;
      this.confirmId = item.id;
      this.confirmQuestionType = item.questionType;
      this.confirmLessonId = item.lessonId;
      this.confirmChapterId = item.chapterId;
      this.confirmCourseId = item.courseId;
    },
    // 交卷
    handExam() {
      this.handExamDialog = true;
    },
    // 取消交卷
    cancelHandExam() {
      this.handExamDialog = false;
    },
    // 交卷
    submitHandExam() {
      examSubmit({
        examPaperId: this.examPaperId,
        examResultId: this.resultId,
        needMarking: this.needMarking
      }).then(res => {
        console.log(res, "交卷");
        if (res.data) {
          this.$message({
            message: "交卷成功",
            type: "success"
          });
          this.handExamDialog = false;
          this.$router.push({
            name: "ExamResult",
            query: {
              examResultId: this.resultId,
              name: this.$route.query.name,
              type: this.$route.query.type
            }
          });
        }
      });
    },
    // 保存进度
    saveProgress() {
      this.$message({
        message: "保存进度成功",
        type: "success"
      });
      this.$router.push({ name: "QuestionBank" });
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
    }
  }
};
</script>
<style lang="scss">
.editor {
  p {
    display: inline-block !important;
  }
  img {
    width: 100px;
    height: 100px;
  }
}
</style>
<style lang="scss" scoped>
.exam {
  width: 1200px;
  margin: 0 auto;
  // 纠错弹窗
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
    // 交卷
    .handExamBox {
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
        margin-top: 50px;
        display: flex;
        padding: 0 25px;
        justify-content: space-between;
        .cancel {
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
        .submit {
          width: 180px;
          height: 45px;
          background: #17a5f2;
          border-radius: 4px;
          text-align: center;
          line-height: 45px;
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
    // 纠错
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
  // 填空题样式
  /deep/ .el-input__inner {
    border: none;
    border-bottom: 1px solid #dcdfe6;
    border-radius: 0px;
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
  // 单选样式
  .el-radio {
    white-space: pre-wrap; //强制换行
    min-height: 30px;
    line-height: 30px;
    display: block;
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #333333;
  }
  /deep/ .el-radio__inner {
    width: 20px;
    height: 20px;
  }
  .el-radio-button__inner,
  .el-radio-group {
    display: block;
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
  .examContent {
    display: flex;
    justify-content: space-between;
    margin-bottom: 50px;
    .examContent-l {
      width: 896px;
      .info {
        width: 856px;
        height: 178px;
        background: #ffffff;
        border-radius: 4px;
        padding: 20px;
        .info-t {
          height: 50px;
          display: flex;
          align-items: center;
          .title {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            margin-left: 16px;
            p {
              font-size: 18px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: #333333;
              span {
                font-size: 14px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: #999999;
              }
            }
          }
        }
        .info-b {
          margin-top: 30px;
          height: 88px;
          padding: 0px 20px;
          background: #f6f6f6;
          display: flex;
          align-items: center;
          border-radius: 4px;
          line-height: 26px;
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #565656;
        }
      }
      .questionType {
        margin-top: 10px;
        height: 60px;
        width: 866px;
        background: #ffffff;
        border-radius: 4px;
        padding-left: 30px;
        ul {
          display: flex;
          align-items: center;
          height: 60px;
          li {
            width: 108px;
            height: 32px;
            background: #eeeeee;
            border-radius: 4px;
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #666666;
            text-align: center;
            line-height: 32px;
            margin-right: 14px;
            a {
              display: inline-block;
              width: 108px;
              height: 32px;
              font-size: 14px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: #666666;
              text-align: center;
              background: #eeeeee;
              border-radius: 4px;
              &.active {
                color: #ffffff;
                background: #17a5f2;
              }
              &:hover {
                cursor: pointer;
              }
            }
          }
        }
      }
      .question-c {
        margin-top: 10px;
        padding: 30px;
        width: 836px;
        border-radius: 4px;
        background: #ffffff;
        .singleChoise {
          .singleTitle {
            display: flex;
            height: 36px;
            display: flex;
            align-items: center;
            .singleType {
              background: #17a5f2;
              border-radius: 4px;
              padding: 8px 12px;
              font-size: 14px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: #ffffff;
            }
            .score {
              font-size: 14px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: #999999;
              margin-left: 15px;
            }
          }
          .ques {
            p {
              margin: 20px 0;
              font-size: 16px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: #333333;
              .order {
                font-weight: bold;
                font-size: 18px;
              }
              .scoreNum {
                color: #999;
                font-size: 14px;
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
            }
            // 材料分析题
            .material {
              .materialItem {
                margin-top: 10px;
                .material-t {
                  display: flex;
                  align-items: center;
                  .materialTitle {
                    padding: 8px 7px;
                    font-size: 14px;
                    font-family: Microsoft YaHei;
                    font-weight: 400;
                    color: #17a5f2;
                    background: #ffffff;
                    border: 1px solid #17a5f2;
                    border-radius: 4px;
                  }
                  span {
                    font-size: 16px;
                    font-family: Microsoft YaHei;
                    font-weight: 400;
                    color: #333333;
                    &.materialScore {
                      font-size: 14px;
                      color: #999;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    .examContent-r {
      width: 288px;
      height: 1050px; //不能比父元素高
      position: sticky; //粘性定位
      top: 0px; //距离顶部为0px fixed定位
      .countDown {
        width: 240px;
        height: 170px;
        background: #ffffff;
        border-radius: 4px;
        padding: 24px;
        .countDown-t {
          display: flex;
          align-items: center;
          justify-content: center;
          p {
            display: flex;
            align-items: center;
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #999999;
            margin-left: 6px;
            span {
              font-size: 20px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: #e82020;
            }
            .van-count-down {
              font-size: 20px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: #e82020;
            }
          }
        }
        .submitPaper {
          margin-top: 30px;
          width: 240px;
          height: 46px;
          background: #17a5f2;
          border-radius: 4px;
          font-size: 16px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          &:hover {
            cursor: pointer;
          }
        }
        .savePaper {
          margin-top: 16px;
          width: 240px;
          height: 46px;
          border: 1px solid #17a5f2;
          border-radius: 4px;
          font-size: 16px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #17a5f2;
          display: flex;
          align-items: center;
          justify-content: center;
          &:hover {
            cursor: pointer;
          }
        }
      }
      // 答题卡
      .answerSheet {
        // height: 800px;
        width: 240px;
        margin-top: 10px;
        background: #ffffff;
        border-radius: 4px;
        padding: 0 24px;
        .title {
          height: 58px;
          border-bottom: 1px solid #f5f5f5;
          display: flex;
          align-items: center;
          font-size: 18px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #333333;
          span {
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #e82020;
            margin-left: 13px;
          }
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
              a {
                width: 100%;
                height: 100%;
                display: block;
                color: #333333;
                &.finish {
                  width: 100%;
                  height: 100%;
                  background: #17a5f1;
                  color: #fff;
                  border: none;
                }
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

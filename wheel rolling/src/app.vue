<template>
    <div id="slider">
        <div class="window" @mouseover="Stop()" @mouseout="Play()">
            <!--需要展示的一列图片-->
            <ul class="container" ref="containers">
                <li v-for="(item, index) in sliders" :key="index" :class="{now:index===turnId}">
                    <img :src="item.img" alt="">
                </li>
            </ul>
            <!--//两侧的箭头-->
            <ul class="direction">
                <li class="left" @click="leftPrev()">
                    <icon name="left" :w="50" :h="50"></icon>
                </li>
                <li class="right" @click="rightNext()">
                    <icon name="right" :w="50" :h="50"></icon>
                </li>
            </ul>
            <!--//下面的小圆点-->
            <ul class="dots">
                <li v-for="(dot, index) in sliders" :key="index"
                    :class="{on:index===turnId}" @click="jump(index)"
                >
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    import global from './globalVar'

    export default {
        name: 'slider',
        data() {
            return {
                sliders: [
                    {img: '../statics/images/001.jpg'},
                    {img: '../statics/images/002.jpg'},
                    {img: '../statics/images/003.jpg'},
                    {img: '../statics/images/004.jpg'}
                ],
                turnId: 0
            }
        },
        mounted() {
            this.Play();
        },
        methods: {
            rightNext() {
                if (this.turnId < 3) {
                    this.turnId += 1;
                } else {
                    this.turnId -= 3;
                }
            },
            leftPrev() {
                if (this.turnId > 0) {
                    this.turnId -= 1;
                } else {
                    this.turnId += 3;
                }
            },
            jump(index) {
                this.turnId = index
            },
            Play() {
                global.timer = setInterval(() => {
                    if (this.turnId < 3) {
                        this.turnId += 1;
                    } else {
                        this.turnId -= 3;
                    }
                }, 4500);
            },
            Stop() {
                clearInterval(global.timer)
            }

        }
    }
</script>
<style lang="less" type="text/less" scoped>


    .window {
        position: relative;
        height: 100%;
        margin: 0 auto;
        overflow: hidden;
    }

    #slider {
        height: 100%;
        width: 100%;
    }

    .container {
        position: relative;
        min-height: 100%;
        li {
            z-index: 1;
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            opacity: 0;
            transition: opacity ease .5s 0s;
        }
    }

    .now {
        opacity: 1 !important;
    }

    img {
        width: 100%;
    }

    .dots {
        position: absolute;
        height: 20px;
        width: 200px;
        z-index: 2;
        margin-left: -82px;
        left: 50%;
        bottom: 20px;
        li {
            cursor: pointer;
            float: left;
            border: 1px solid rgba(1, 0, 0, 0.2);
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: rgba(0, 0, 0, 0.4);
            margin-right: 36px;
            transition: background ease .5s 0s
        }
        .on {
            background: #ffffff;
        }
    }

    .direction {
        li.left {
            color: white;
            position: absolute;
            margin-top: -25px;
            left: 10px;
            top: 50%;
            z-index: 2;
            opacity: 0.2;
        }
        li.right {
            color: white;
            position: absolute;
            margin-top: -25px;
            right: 10px;
            top: 50%;
            z-index: 2;
            opacity: 0.4;
        }
        li:hover {
            opacity: 1;
        }
    }
</style>
<template>
    <n-back-top :left="100" />
    <n-flex vertical>
        <n-grid cols="1 s:2 m:4" responsive="screen" :x-gap="15" :y-gap="18">
            <n-gi v-for="(card, index) in cards" :key="index">
                <n-card :style="cardStyle" size="small">
                    <n-flex justify="space-between" align="center">

                        <div style="display: flex; align-items: center; justify-content: center"> 
                        <n-icon size="20" style="margin-right: 8px; padding-top: 2px;">
                                <component :is="card.icon" />
                            </n-icon>
                            <p class="calmTitle">{{ card.title }}</p>
                        </div>

                        <n-statistic tabular-nums>
                            <n-number-animation :from="0" :to="card.value" :precision="card.precision"
                                :duration="4000" />
                            <template v-if="card.suffix" #suffix>
                                {{ card.suffix }}
                            </template>
                        </n-statistic>
                    </n-flex>
                </n-card>
            </n-gi>

            <n-gi>
                <n-card size="small" style="width: 100%; height: 120px;">
                    <div class="timeStyle">現在時間：{{ currentTime }}</div>
                </n-card>
            </n-gi>
        </n-grid>

        <n-grid style="margin-top: 8px" cols="1 s:2 m:3" responsive="screen" :x-gap="15" :y-gap="20">
            <n-gi v-for="(chart, index) in charts" :key="index">
                <n-card>
                    <div :id="'chart' + index" style="width: 100%; height: 284px;"></div>
                </n-card>
            </n-gi>
            <n-gi :span="2">
                <n-card size="small">
                    <div class="fontStyle"><strong>{{ tableTitle }}</strong></div>
                    <div class="table-container">
                        <n-data-table :columns="tableColumns" :data="tableData" />
                    </div>
                </n-card>
            </n-gi>
        </n-grid>
    </n-flex>
</template>

<script lang="ts" setup>
import { computed, onMounted, watch, ref } from 'vue';
import { useScreenStore } from '@/stores/useScreen';
import { storeToRefs } from 'pinia';
import { useThemeVars } from 'naive-ui';
import * as echarts from 'echarts';
import { LinkOutline, ServerOutline, ArrowUpCircleOutline, ArrowDownCircleOutline } from '@vicons/ionicons5';
import { useStyleStore } from '@/stores/style';
import { useRouter } from 'vue-router';
import { chartOptions } from '@/utils/chartData';

const styleStore = useStyleStore();
const cardStyle = computed(() => styleStore.getCardStyle());
const router = useRouter();
const cards = [
    { title: '完成檢查人數', value: 82, icon: LinkOutline, precision: 0, suffix: '人' },
    { title: '完成報到人數', value: 17, icon: ArrowUpCircleOutline, precision: 0, suffix: '人' },
    { title: '平均等待時間', value: 2, icon: ArrowDownCircleOutline, precision: 0, suffix: '分鐘' },
];


// const cards = [
//     { title: '連接數', value: 214, icon: LinkOutline, precision: 0 },
//     { title: '總上傳', value: 12.43, icon: ArrowUpCircleOutline, precision: 2, suffix: 'TiB' },
//     { title: '總下載', value: 31.79, icon: ArrowDownCircleOutline, precision: 2, suffix: 'TiB' },
//     { title: '積分數', value: 241248, icon: ServerOutline, precision: 0 },
// ]


const charts = chartOptions;

const screenStore = useScreenStore();
const { isHidden, screenWidth } = storeToRefs(screenStore);

// ECharts
const themeVars = useThemeVars();

const updateChart = (index: number) => {
    const chartDom = document.getElementById('chart' + index);
    if (chartDom) {
        const myChart = echarts.init(chartDom);
        const option: echarts.EChartsOption = {
            title: {
                text: charts[index].title,
                textStyle: {
                    color: themeVars.value.textColorBase,
                },
            },
            tooltip: {
                trigger: 'axis',
            },
            legend: {
                textStyle: {
                    color: themeVars.value.textColorBase,
                },
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: charts[index].data.xAxis,
                axisLabel: {
                    color: themeVars.value.textColorBase,
                    interval: 0, // 確保所有標籤都顯示出來
                    rotate: 45, // 標籤旋轉角度，避免重疊
                },
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    formatter: '{value}',
                    color: themeVars.value.textColorBase,
                },
            },
            series: charts[index].data.series.map((seriesData) => ({
                name: seriesData.name,
                type: 'bar',
                data: seriesData.data,
                itemStyle: {
                    color: seriesData.color || themeVars.value.primaryColor,
                },
                markLine: {
                    data: [
                        { type: 'average', name: '平均值' }
                    ],
                    lineStyle: {
                        color: 'red'
                    },
                    symbol: ['none', 'circle'], // 取消箭頭，使用圓圈
                    symbolSize: [0, 10], // 圓圈大小
                    label: {
                        position: 'insideEndTop', // 設置標籤位置
                        color:'red'
                    }
                },
                emphasis: {
                    focus: 'series',
                },
            })),
        };
        myChart.setOption(option);
    } else {
        console.error(`Element with id "chart${index}" not found.`);
    }
};

// 更新時間
const currentTime = ref(new Date().toLocaleString());
setInterval(() => {
    currentTime.value = new Date().toLocaleString();
}, 1000);

onMounted(() => {
    charts.forEach((_, index) => {
        updateChart(index);
    });
    // 初始化最後一個柱狀圖
    updateChart(charts.length);
});

watch(
    themeVars,
    () => {
        charts.forEach((_, index) => {
            updateChart(index);
        });
        updateChart(charts.length);
    },
    { deep: true }
);

// 表格數據
const tableTitle = '前十名預期最常服務時間排序表';
const tableColumns = [
    { title: '排序', key: 'sort' },
    { title: '身分認證', key: 'id' },
    { title: '姓名', key: 'name' },
    { title: '預期總服務時間', key: 'serverTime' },
    { title: '預期報到時間', key: 'checkIn' },
    { title: '預期結束時間', key: 'checkOut' },
];
const tableData = [
    { sort: '1', id: 'B135876443', name: '楊明昌', serverTime: '5時 : 37分', checkIn: 'AM 09:00', checkOut: 'PM 15:37' },
    { sort: '2', id: 'L221879655', name: '張容玲', serverTime: '5時 : 37分', checkIn: 'AM 09:00', checkOut: 'PM 15:37' },
    { sort: '3', id: 'B167864325', name: '陳怡君', serverTime: '5時 : 37分', checkIn: 'AM 09:00', checkOut: 'PM 15:37' },
    { sort: '4', id: 'I187224311', name: '林佩君', serverTime: '5時 : 37分', checkIn: 'AM 09:00', checkOut: 'PM 15:37' },
    // 添加更多數據以進行滾動測試
    { sort: '5', id: 'C222333444', name: '李小明', serverTime: '4時 : 45分', checkIn: 'AM 08:30', checkOut: 'PM 13:15' },
    { sort: '6', id: 'D555666777', name: '王大華', serverTime: '6時 : 10分', checkIn: 'AM 09:15', checkOut: 'PM 15:25' },
    { sort: '7', id: 'E888999000', name: '張怡君', serverTime: '5時 : 50分', checkIn: 'AM 08:45', checkOut: 'PM 14:35' },
    { sort: '8', id: 'F111222333', name: '陳建中', serverTime: '3時 : 30分', checkIn: 'AM 07:30', checkOut: 'PM 11:00' },
    { sort: '9', id: 'G444555666', name: '林小芳', serverTime: '7時 : 20分', checkIn: 'AM 10:00', checkOut: 'PM 17:20' },
    { sort: '10', id: 'H777888999', name: '黃美麗', serverTime: '5時 : 05分', checkIn: 'AM 09:20', checkOut: 'PM 14:25' }
];
</script>

<style>
.calmTitle{
    font-family: "Noto Sans TC", sans-serif;
    font-size: 16px !important;
    margin-bottom: 16px;
    font-weight: 600;
    color: black;
}

.fontStyle {
    font-family: "Noto Sans TC", sans-serif;
    font-size: 19px !important;
    margin-bottom: 16px;
    font-weight: 900;
    color: black;
}

.timeStyle {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    font-family: "Noto Sans TC", sans-serif;
    font-size: 16px !important;
    font-weight: 500;
    color: black;
}

.table-container {
    max-height: 240px;
    overflow-y: auto;
}
</style>

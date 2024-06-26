<template>
    <n-back-top :left="100" />
    <n-flex vertical>
        <n-grid cols="1 s:2 m:4" responsive="screen" :x-gap="15" :y-gap="20">
            <n-gi v-for="(card, index) in cards" :key="index">
                <n-card :style="cardStyle" :title="card.title" size="small">
                    <n-flex justify="space-between" align="center">
                        <n-icon size="24">
                            <component :is="card.icon" />
                        </n-icon>
                        <n-statistic tabular-nums>
                            <n-number-animation :from="0" :to="card.value" :precision="card.precision" />
                            <template v-if="card.suffix" #suffix>
                                {{ card.suffix }}
                            </template>
                        </n-statistic>
                    </n-flex>
                </n-card>
            </n-gi>

            <n-gi>
                <n-card size="small" class="fontStyle">
                    <div>{{ currentTime }}</div>
                </n-card>
            </n-gi>
        </n-grid>

        <n-grid style="margin-top: 16px" cols="1 s:2 m:3" responsive="screen" :x-gap="15" :y-gap="20">
            <n-gi v-for="(chart, index) in charts" :key="index">
                <n-card>
                    <div :id="'chart' + index" style="width: 100%; height: 284px;"></div>
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
    { title: '連接數', value: 214, icon: LinkOutline, precision: 0 },
    { title: '總上傳', value: 12.43, icon: ArrowUpCircleOutline, precision: 2, suffix: 'TiB' },
    { title: '總下載', value: 31.79, icon: ArrowDownCircleOutline, precision: 2, suffix: 'TiB' },
];

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
            xAxis: {
                type: 'category',
                data: charts[index].data.xAxis,
                axisLabel: {
                    color: themeVars.value.textColorBase,
                },
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    formatter: '{value} M',
                    color: themeVars.value.textColorBase,
                },
            },
            series: charts[index].data.series.map((seriesData) => ({
                name: seriesData.name,
                type: 'bar', // 設置為柱狀圖
                data: seriesData.data,
                itemStyle: {
                    color: seriesData.color || themeVars.value.primaryColor, // 應用顏色設置
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
});

watch(
    themeVars,
    () => {
        charts.forEach((_, index) => {
            updateChart(index);
        });
    },
    { deep: true }
);

</script>

<style>
.fontStyle > div {
    font-size: 18px !important;
    /* font-family: NotoSans; */
    letter-spacing: 1px;
    font-weight: bolder;

    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
}

.fontStyle{
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
    height: 98px;
}

</style>
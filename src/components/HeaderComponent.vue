<template>
    <n-space justify="space-between" class="center-aligned">
        <n-space class="center-aligned" justify="space-between">
            <n-popover trigger="hover">
                <template #trigger>
                    <n-button quaternary style="font-size: 24px;" @click="ThemeSwitcherDrawer('right')">
                        <n-icon :component="MenuOutline" style="cursor: pointer;"></n-icon>
                    </n-button>
                </template>
                <span>面板設置</span>
            </n-popover>
        </n-space>

        <span
            style="font-weight:900;"
            :style="{ display: isHidden ? 'none' : 'flex', marginLeft:'-24px' , fontSize: '24px', transition: 'color 0.2s' }">
            <strong>智慧健檢排程戰情中心</strong>
        </span>
        <div :style="{ display: isHidden ? 'flex' : 'none' }">
            <n-dropdown size="large" :options="menuOptions">
                <n-button quaternary style="font-size: 18px">
                    <n-icon :component="MenuOutline" style="cursor: pointer;"></n-icon>
                </n-button>
            </n-dropdown>
        </div>
    </n-space>
    <n-drawer v-model:show="themeSwitcherDrawer" :placement="placement" :default-width="251" resizable>
        <n-drawer-content title="面板配置">
            <ThemeSwitcher />
        </n-drawer-content>
    </n-drawer>
</template>

<script lang="ts" setup>
import { ref, h } from 'vue';
import { useRouter } from 'vue-router';
import { useThemeStore } from '@/stores/theme';
import { useScreenStore } from '@/stores/useScreen';
import { storeToRefs } from 'pinia';
import { NAvatar, NText, NIcon, useMessage, type DrawerPlacement } from 'naive-ui';
import ThemeSwitcher from './ThemeSwitcher.vue';
import { menuOptions } from './Options/Menu';
import { MenuOutline, PersonCircleOutline as UserIcon, LogOutOutline as LogoutIcon } from '@vicons/ionicons5';

const screenStore = useScreenStore();
const { isHidden } = storeToRefs(screenStore);

const themeSwitcherDrawer = ref(false);
const placement = ref<DrawerPlacement>('right');
const themeStore = useThemeStore();

const ThemeSwitcherDrawer = (place: DrawerPlacement) => {
    themeSwitcherDrawer.value = true;
    placement.value = place;
};

</script>


<style>
.center-aligned {
    display: flex;
    align-items: center;
    height: 60px;
}
</style>

<template>
  <div>
    <v-row>
      <v-col>
        <h-summary-box
          color="orange"
          icon="mdi-account-group"
          :numeric="onlineUserCount"
          description="实时在线用户"
          :percent="30"
        ></h-summary-box>
      </v-col>
      <v-col>
        <h-summary-box
          color="info"
          icon="mdi-cart"
          numeric="900"
          description="Total Orders"
          :percent="70"
        ></h-summary-box>
      </v-col>
      <v-col>
        <h-summary-box
          color="red"
          icon="mdi-wallet"
          numeric="1050"
          description="Total Expenses"
          :percent="40"
        ></h-summary-box>
      </v-col>
      <v-col>
        <h-summary-box
          color="green"
          icon="mdi-white-balance-auto"
          numeric="80 %"
          description="Total Profit"
          :percent="80"
        ></h-summary-box>
      </v-col>
    </v-row>
    <v-row v-if="isDistributed">
      <v-col>
        <h-link-box
          color="success"
          icon="mdi-cog-play"
          description="服务管理配置中心"
          link="http://192.168.101.10:8849/nacos "
        ></h-link-box>
      </v-col>
      <v-col>
        <h-link-box
          color="orange"
          icon="mdi-compare"
          description="服务流控规则中心"
          link="http://192.168.101.10:8858"
        ></h-link-box>
      </v-col>
      <v-col>
        <h-link-box
          color="green"
          icon="mdi-chart-line"
          description="服务运行监控中心"
          link="http://192.168.101.10:8845"
        ></h-link-box>
      </v-col>
      <v-col>
        <h-link-box
          color="info"
          icon="mdi-map-search"
          description="日志聚合分析中心"
          link="http://192.168.101.10:5601"
        ></h-link-box>
      </v-col>
      <v-col>
        <h-link-box
          color="error"
          icon="mdi-source-branch-remove"
          description="链路追踪监控中心"
          link="http://192.168.101.10:8878"
        ></h-link-box>
      </v-col>
      <v-col>
        <h-link-box
          color="warning"
          icon="mdi-monitor-dashboard"
          description="接口开发文档中心"
          link="http://192.168.101.10:8847/swagger-ui.html "
        ></h-link-box>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <h-chart-card title="效能分布">
          <h-pie-chart></h-pie-chart>
        </h-chart-card>
      </v-col>
      <v-col>
        <h-chart-card title="资源使用分析">
          <h-radar-chart></h-radar-chart>
        </h-chart-card>
      </v-col>
      <v-col>
        <h-chart-card title="运行分析"><h-bar-chart></h-bar-chart></h-chart-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts" setup>
import { useRealTimeInformation } from '@/composables/hooks';

import { VARIABLES } from '@/configurations';

import HBarChart from './charts/HBarChart.vue';
import HPieChart from './charts/HPieChart.vue';
import HRadarChart from './charts/HRadarChart.vue';

defineOptions({ name: 'DashboardConsole', components: { HBarChart, HPieChart, HRadarChart } });

const { onlineUserCount } = useRealTimeInformation();

const isDistributed = computed(() => {
  return VARIABLES.isDistributedArchitecture();
});
</script>

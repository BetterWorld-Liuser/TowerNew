<template>
  <div
    id="dataCanvas"
    style="height:100%;width:100%;background-color:white;border:1px solid;border-color:white;border-radius:7px;"
  />
</template>

<script>
import axios from "axios";

export default {
  name: "FrontKnowShow",
  methods: {
    drawCharts() {
      let myChart = this.$echarts.init(document.getElementById("dataCanvas"));
      myChart.showLoading();
      axios.get(" http://localhost:3000/data").then(response => {
        let data = response.data[0];
        console.log(data);
        myChart.hideLoading();
        this.$echarts.util.each(data.children, function(datum, index) {
          index % 2 === 0 && (datum.collapsed = false);
        });

        let option = {
          tooltip: {
            trigger: "item",
            triggerOn: "mousemove",
            formatter: "{c}"
          },
          series: [
            {
              type: "tree",

              data: [data],

              top: "1%",
              left: "7%",
              bottom: "1%",
              right: "20%",

              symbolSize: [20, 20],

              label: {
                position: "left",
                verticalAlign: "middle",
                align: "right",
                fontSize: 14
              },

              leaves: {
                label: {
                  position: "right",
                  verticalAlign: "middle",
                  align: "left"
                }
              },

              expandAndCollapse: true,
              animationDuration: 550,
              animationDurationUpdate: 750,
              itemStyle: {
                color: "#ffa39e",
                borderColor: "#69c0ff"
              }
            }
          ]
        };

        myChart.setOption(option);

        myChart.on("click", function(params) {
          // 获取点击图例的选中状态
          // 在控制台中打印
          console.log(
            params
          );
        });
      });
    }
  },
  mounted() {
    this.drawCharts();
  }
};
</script>

<style>
</style>
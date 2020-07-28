<template>
  <highcharts :options="options"></highcharts>
</template>

<script>
import { Chart } from "highcharts-vue";
import Highcharts from "highcharts";

export default {
  name: "Diagram",
  components: {
    highcharts: Chart
  },
  props: {
    title: {
      type: String,
      default: ""
    },
    subTitle: {
      type: String,
      default: ""
    },
    data: {
      type: [Array, Boolean],
      default: false
    }
  },
  computed: {
    options: function () {
      return {
        colors: ["#0D5257", "#FF671F", "#6F91A6", "#C6B78E", "#3D7478", "#99CED3", "#4D6574", "#4D6D9A", "#F8874F", "#F9D46A"],
        credits: {
          enabled: false
        },
        chart: {
          type: "pie",
          style: {
            fontFamily: "Cera Pro, Arial, Helvetica, Verdana, sans-serif",
            fontSize: "14px"
          }
        },
        title: {
          text: this.title,
          margin: 20,
          style: {
            fontSize: "30px",
            fontWeight: "regular"
          }
        },
        subtitle: {
          text: this.subTitle,
          marginBottom: 50
        },
        plotOptions: {
          pie: {
            dataLabels: {
              style: {
                fontSize: "14px",
                fontWeight: "regular"
              }
            }
          }
        },
        series: [
          {
            data: this.data
          }
        ],
        tooltip: {
          formatter: function () {
            let ret;
            ret = `<div style="font-size: 21px; margin: 0.5em 0; text-align: center;">${this.key}</div>`;
            ret += "<div style=\"display: block; margin: 1em; border-top: 1px solid #e5e5e5;\">";
            ret += "    <div style=\"color: #333; display: block; text-align: center; font-size: 16px; line-height: 1; font-weight: regular; margin: 1em 0.5em 0.5em;\">";
            ret += `      <span style="opacity: 0.5;">Total: </span>${Highcharts.numberFormat(this.total, 0, "0", " ")}`;
            ret += "    </div>";
            ret += "</div>";
            ret += "<div style=\"display: block; margin: 1em; border-top: 1px solid #e5e5e5;\">";
            ret += `    <div style="color:${this.point.color}; display: block; text-align: center; font-size: 16px; line-height: 1; font-weight: regular; margin: 1em 0.5em 0.5em;">${this.key}</div>`;
            ret += `    <div style="color:${this.point.color}; display: block; text-align: center; font-size: 26px; font-weight: regular; margin: 0.25em;">${Highcharts.numberFormat(this.y, 0, 0, " ")}</div>`;
            ret += `    <div style="display: block; text-align: center; font-size: 16px; font-weight: regular; margin: 0.25em 0 0.5em; opacity: 0.6; ">${Highcharts.numberFormat(this.percentage, 0)}%</div>`;
            ret += "</div>";
            return ret;
          },
          footerFormat: "",
          shared: true,
          useHTML: true,
          borderColor: "#e1dbcf",
          shadow: false,
          backgroundColor: "#fff",
          followPointer: true,
          valueSuffix: ""
        }
      };
    }
  }
};
</script>

<style scoped>

</style>

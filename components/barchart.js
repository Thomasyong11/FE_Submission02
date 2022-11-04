const ctx = document.getElementById("myChart").getContext("2d");
const myChart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["today", "yesterday", "day 3", "day 4", "day 5", "day 6", "day 7"],
    datasets: [
      {
        label: "",
        data: [12, 19, 3, 5, 2, 3, 11],
        borderColor: "#B8B8B8",
        borderWidth: 3,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          display: false,
        },
      },
    },
  },
});

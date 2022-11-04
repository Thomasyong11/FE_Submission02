const ctx = document.getElementById("canvas").getContext("2d");
const canvas = new Chart(ctx, {
  type: "bar",
  data: {
    labels: [
      "this month",
      "last month",
      "month 3",
      "month 4",
      "month 5",
      "month 6",
      "month 7",
    ],
    datasets: [
      {
        label: "",
        data: [20, 19, 7, 5, 8, 3, 15],
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

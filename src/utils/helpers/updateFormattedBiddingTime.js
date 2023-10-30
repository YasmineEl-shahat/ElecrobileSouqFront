export const updateFormattedBiddingTime = (endDate, interval) => {
  const currentTime = new Date();
  const timeDifference = new Date(endDate) - currentTime;

  if (timeDifference > 0) {
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    const formattedTime = `Ending In ${hours
      .toString()
      .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
    return formattedTime;
  } else {
    if (interval) clearInterval(interval);
    return null;
  }
};

/**
 * Timestamp conversion utilities
 */

/**
 * Check if a value is a valid Unix timestamp
 * Valid range: 2000-01-01 to 2100-01-01
 * Supports both seconds (10 digits) and milliseconds (13 digits)
 */
export const isUnixTimestamp = (value: number | string): boolean => {
  const num = typeof value === "string" ? parseInt(value, 10) : value;

  // Must be a valid number
  if (isNaN(num) || !isFinite(num)) {
    return false;
  }

  // Check for seconds timestamp (10 digits)
  // Range: 946684800 (2000-01-01) to 4102444800 (2100-01-01)
  if (num >= 946684800 && num <= 4102444800) {
    return true;
  }

  // Check for milliseconds timestamp (13 digits)
  // Range: 946684800000 (2000-01-01) to 4102444800000 (2100-01-01)
  if (num >= 946684800000 && num <= 4102444800000) {
    return true;
  }

  return false;
};

/**
 * Format Unix timestamp to human-readable format
 * Format: Nov-05-2025 05:24:09 AM +UTC
 */
export const formatUnixTimestamp = (value: number | string): string => {
  const num = typeof value === "string" ? parseInt(value, 10) : value;

  // Convert to milliseconds if needed (10-digit timestamp is in seconds)
  const timestamp = num < 10000000000 ? num * 1000 : num;

  const date = new Date(timestamp);

  // Month names
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const month = months[date.getUTCMonth()];
  const day = String(date.getUTCDate()).padStart(2, "0");
  const year = date.getUTCFullYear();

  let hours = date.getUTCHours();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Convert to 12-hour format

  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  const seconds = String(date.getUTCSeconds()).padStart(2, "0");

  return `${month}-${day}-${year} ${String(hours).padStart(2, "0")}:${minutes}:${seconds} ${ampm} +UTC`;
};

/**
 * Convert Unix timestamp value to formatted string with original value
 * Format: "1746514460 (Nov-05-2025 05:24:09 AM +UTC)"
 */
export const convertTimestampValue = (value: number | string): string => {
  if (!isUnixTimestamp(value)) {
    return String(value);
  }

  const formatted = formatUnixTimestamp(value);
  return `${value} (${formatted})`;
};


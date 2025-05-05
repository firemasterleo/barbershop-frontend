// composables/useAdminEarnings.js
import { supabase } from '../utils/supabaseClient';

/**
 * Fetches barbershop earnings data from Supabase for the specified date range
 * 
 * @param {string} startDate - Start date in YYYY-MM-DD format
 * @param {string} endDate - End date in YYYY-MM-DD format
 * @returns {Promise<Array>} - Array of daily earnings data
 */
export const useBarbershopEarnings = async (startDate, endDate) => {
  try {
    // Query the barbershop_daily_earnings view in Supabase
    // Make sure this view exists and contains day, total_revenue, and total_visits columns
    const { data, error } = await supabase
      .from('barbershop_daily_earnings')
      .select('day, total_revenue, total_visits')
      .gte('day', startDate)
      .lte('day', endDate)
      .order('day');
    
    if (error) {
      console.error('Supabase query error:', error);
      throw new Error('Failed to fetch earnings data');
    }
    
    // If no data is returned, return an empty array
    if (!data || data.length === 0) {
      console.warn('No earnings data found for the selected date range');
      return [];
    }
    
    return data;
  } catch (error) {
    console.error('Error in useBarbershopEarnings:', error);
    throw error;
  }
};
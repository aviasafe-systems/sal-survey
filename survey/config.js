/**
 * ============================================================================
 * FILE: survey/config.js
 * VERSION: 2.0.0
 * DATE: 2026-06-15
 * PURPOSE: Supabase configuration and airline settings
 * DEPENDENCIES: Supabase JS SDK (loaded in index.html)
 * ============================================================================
 * CHANGELOG:
 * 2.0.0 (2026-06-15) - Initial multi-tenant config with airline ID
 * ============================================================================
 */

// Supabase Configuration - REPLACE WITH YOUR ACTUAL VALUES
const SUPABASE_URL = ' https://nrbnhvtomwfmanijtgal.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5yYm5odnRvbXdmbWFuaWp0Z2FsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQwOTAxMTQsImV4cCI6MjA4OTY2NjExNH0.QsOVIjDDc_UzT7CqtUedGktrAtVTvXk3HnxKlwtWtDs';

// Get Sita Air's UUID from database - Run in Supabase SQL:
// SELECT id FROM airlines WHERE slug = 'sita-air';
const AIRLINE_ID = '9c41f9bb-6337-4ef0-bb35-040d632f4646';

// Initialize Supabase client
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: false },  // No auth needed for survey submission
    realtime: { params: { eventsPerSecond: 10 } }
});

// Export for use in app.js (global)
window.supabaseClient = supabase;
window.AIRLINE_ID = AIRLINE_ID;
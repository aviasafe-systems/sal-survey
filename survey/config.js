/*
================================================================================
FILE: SurveySMS/survey/config.js
VERSION: 1.0.0
REVISION DATE: 2026-06-17
PURPOSE: Multi-tenant configuration - tenant_id pulled from URL parameters
DEPENDENCIES: None
USAGE: survey/survey.html
AUTHOR: Ghanshyam Acharya
CODE OWNER: aviasafetysystems.com
================================================================================
*/

// SurveySMS/survey/config.js
// Multi-tenant configuration - tenant_id pulled from URL parameters

// Get tenant from URL
const urlParams = new URLSearchParams(window.location.search);
const tenantId = urlParams.get('tenant');

// Validate tenant exists
if (!tenantId) {
    console.error('No tenant specified in URL. Please use ?tenant=your-tenant-id');
    // Optionally redirect to a tenant selection page or show error
    document.body.innerHTML = `
        <div style="padding: 40px; text-align: center; font-family: Arial;">
            <h2>⚠️ No Tenant Specified</h2>
            <p>Please use the format: <code>?tenant=your-tenant-id</code></p>
            <p>Example: <code>aviasafesystem.com/survey.html?tenant=sita-air</code></p>
        </div>
    `;
    throw new Error('Tenant ID required');
}

// Supabase configuration with dynamic tenant
const SUPABASE_CONFIG = {
    url: 'https://your-project.supabase.co', // Replace with your actual URL
    anonKey: 'your-anon-key', // Replace with your actual key
    table: 'survey_responses'
};

// Build tenant-specific schema
const TENANT_CONFIG = {
    tenantId: tenantId,
    tableName: `${tenantId}_responses`, // Optional: separate tables per tenant
    storagePath: `survey-data/${tenantId}`,
    // Add tenant-specific branding if needed
    branding: {
        logo: `/assets/logos/${tenantId}.png`,
        primaryColor: getTenantColor(tenantId)
    }
};

// Helper function for tenant branding (customize as needed)
function getTenantColor(tenantId) {
    const colors = {
        'sita-air': '#1a73e8',
        'boeing': '#0033a0',
        'airbus': '#002b7a',
        'delta': '#003366',
        'united': '#002244'
    };
    return colors[tenantId] || '#007bff';
}

// Export configuration
const CONFIG = {
    tenantId,
    supabase: SUPABASE_CONFIG,
    tenant: TENANT_CONFIG
};

// Initialize tenant session
async function initializeTenant() {
    try {
        console.log(`🔑 Initializing tenant: ${tenantId}`);
        
        // You could add a database call here to fetch tenant-specific settings
        // Example: fetch(`/api/tenant/${tenantId}/config`);
        
        return {
            success: true,
            tenantId,
            config: CONFIG
        };
    } catch (error) {
        console.error('Tenant initialization failed:', error);
        return {
            success: false,
            error: error.message
        };
    }
}

// Run initialization when script loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeTenant);
} else {
    initializeTenant();
}

export { CONFIG, tenantId, initializeTenant };
/*
================================================================================
FILE: SurveySMS/js/analytics/export-utils.js
VERSION: 1.0
REVISION DATE: 2026-06-16
PURPOSE: Export utilities for PDF and Excel
AFFECTED: analytics/airline-analytics.html, analytics/caan-analytics.html
================================================================================
*/

function exportPDF(elementId, fileName) {
    const element = document.getElementById(elementId);
    const btn = document.querySelector('.btn-export.pdf');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating PDF...';
    btn.disabled = true;

    const opt = {
        margin: [10, 10, 10, 10],
        filename: `${fileName}_${new Date().toISOString().split('T')[0]}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };

    html2pdf().set(opt).from(element).save().then(function() {
        btn.innerHTML = originalText;
        btn.disabled = false;
        console.log('✅ PDF exported successfully');
    }).catch(function(err) {
        console.error('PDF export failed:', err);
        btn.innerHTML = originalText;
        btn.disabled = false;
        alert('PDF export failed. Please use Print > Save as PDF.');
    });
}

function exportExcel(data, fileName, isConsolidated) {
    if (!data) {
        alert('No data to export.');
        return;
    }

    let csv = `SMS Gap Analysis Report\n`;
    csv += `Generated: ${new Date().toLocaleString()}\n`;
    csv += `Airline: ${data.name}\n\n`;

    csv += 'PILLAR SUMMARY\n';
    csv += 'Pillar,Average Score,Status\n';
    for (const pillar in data.pillarAverages) {
        const score = data.pillarAverages[pillar] || 0;
        const status = score >= 4.0 ? 'Strong' : (score >= 3.0 ? 'Moderate' : 'Weak');
        csv += `${pillar},${score.toFixed(1)},${status}\n`;
    }
    csv += '\n';

    csv += 'ELEMENT DETAILS\n';
    csv += 'Element,Name,Pillar,Current Score,Target Score,Gap,Severity\n';
    for (const key in data.gaps) {
        const gap = data.gaps[key];
        csv += `Element ${key},${gap.name},${gap.pillar},${gap.current.toFixed(1)},4.5,${gap.gap.toFixed(1)},${gap.severity}\n`;
    }

    csv += '\nSUMMARY\n';
    csv += `Total Sessions,${data.totalSessions || 5}\n`;
    csv += `Completed Sessions,${data.sessionsCompleted || 0}\n`;
    csv += `Overall Average,${(data.overallAverage || 0).toFixed(1)}\n`;
    csv += `Critical Gaps,${data.criticalGaps || 0}\n`;

    if (isConsolidated && data.airlineData) {
        csv += '\nAIRLINE BREAKDOWN\n';
        csv += 'Airline,Overall Score,Policy,Risk Management,Assurance,Promotion,Critical Gaps,Completion Date\n';
        data.airlineData.forEach(airline => {
            const date = airline.completionDate ? new Date(airline.completionDate).toLocaleDateString() : 'Pending';
            csv += `${airline.name},${(airline.overallAverage || 0).toFixed(1)},${(airline.pillarAverages.Policy || 0).toFixed(1)},${(airline.pillarAverages['Risk Management'] || 0).toFixed(1)},${(airline.pillarAverages.Assurance || 0).toFixed(1)},${(airline.pillarAverages.Promotion || 0).toFixed(1)},${airline.criticalGaps || 0},${date}\n`;
        });
    }

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName}_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    alert('✅ Excel export complete!');
}
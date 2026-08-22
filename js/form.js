document.addEventListener("DOMContentLoaded", () => {
    if (window.lucide) window.lucide.createIcons();

    const steps = document.querySelectorAll(".client-form-step");
    const navItems = document.querySelectorAll(".client-step");
    const nextBtn = document.getElementById("nextBtn");
    const backBtn = document.getElementById("backBtn");
    const formActions = document.getElementById("formActions");
    const formAlert = document.getElementById("formAlert");
    const formAlertText = document.getElementById("formAlertText");
    const progressFill = document.getElementById("progressFill");
    const progressPercent = document.getElementById("progressPercent");
    const progressTitle = document.getElementById("progressTitle");
    const flowList = document.getElementById("flowList");
    const addFlowBtn = document.getElementById("addFlowBtn");
    const form = document.getElementById("requirementForm");
    const successStep = document.getElementById("successStep");

    const stepTitles = [
        "01 · Business", "02 · Workflow", "03 · App", "04 · Users",
        "05 · Admin", "06 · Client", "07 · Tracking", "08 · Integrations",
        "09 · Reports", "10 · Design", "11 · Review"
    ];

    let currentStep = 0;

    function showAlert(msg) {
        formAlertText.textContent = msg;
        formAlert.classList.add("show");
        formAlert.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    function hideAlert() {
        formAlert.classList.remove("show");
    }

    function updateStep(index) {
        hideAlert();

        steps.forEach((step, i) => {
            step.classList.toggle("active", i === index);
        });

        navItems.forEach((nav, i) => {
            nav.classList.remove("active", "completed");
            if (i === index) nav.classList.add("active");
            else if (i < index) nav.classList.add("completed");
        });

        const percent = Math.round(((index + 1) / steps.length) * 100);
        progressFill.style.width = `${percent}%`;
        progressPercent.textContent = `${percent}%`;
        progressTitle.textContent = stepTitles[index] || "";

        backBtn.style.visibility = index === 0 ? "hidden" : "visible";
        nextBtn.innerHTML = index === steps.length - 1 
            ? `Submit <i data-lucide="check" width="16" height="16"></i>` 
            : `Next <i data-lucide="arrow-right" width="16" height="16"></i>`;

        if (index === steps.length - 1) {
            renderReviewSummary();
        }

        if (window.lucide) window.lucide.createIcons();
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function validateStep(index) {
        const requiredInputs = steps[index].querySelectorAll("input[required], select[required], textarea[required]");
        for (let input of requiredInputs) {
            if (input.type === "checkbox" && !input.checked) {
                showAlert("Please accept the required confirmation.");
                input.focus();
                return false;
            }
            if (!input.value.trim()) {
                showAlert(`Please fill in: ${input.closest(".client-field")?.querySelector("label")?.innerText.replace("*", "").trim() || "all required fields"}`);
                input.focus();
                return false;
            }
            if (input.type === "email" && !/^\S+@\S+\.\S+$/.test(input.value)) {
                showAlert("Please enter a valid email address.");
                input.focus();
                return false;
            }
        }
        return true;
    }

    nextBtn.addEventListener("click", () => {
        if (!validateStep(currentStep)) return;

        if (currentStep < steps.length - 1) {
            currentStep++;
            updateStep(currentStep);
        } else {
            // Submission
            form.style.display = "none";
            formActions.style.display = "none";
            document.querySelector(".client-progress").style.display = "none";
            document.querySelector(".client-intro").style.display = "none";
            successStep.classList.add("active");
            if (window.lucide) window.lucide.createIcons();
        }
    });

    backBtn.addEventListener("click", () => {
        if (currentStep > 0) {
            currentStep--;
            updateStep(currentStep);
        }
    });

    // Workflow step builder
    if (addFlowBtn && flowList) {
        addFlowBtn.addEventListener("click", () => {
            const nextIdx = flowList.querySelectorAll(".client-flow-item").length + 1;
            const div = document.createElement("div");
            div.className = "client-flow-item";
            div.innerHTML = `
                <div class="client-flow-index">${nextIdx}</div>
                <input name="flow[]" placeholder="Describe workflow step">
                <button type="button" class="client-remove-flow" aria-label="Remove workflow step">×</button>
            `;
            flowList.appendChild(div);
        });

        flowList.addEventListener("click", (e) => {
            if (e.target.classList.contains("client-remove-flow")) {
                e.target.closest(".client-flow-item").remove();
                flowList.querySelectorAll(".client-flow-item").forEach((el, idx) => {
                    el.querySelector(".client-flow-index").textContent = idx + 1;
                });
            }
        });
    }

    // Color Pickers
    ["primary", "secondary"].forEach((name) => {
        const picker = document.getElementById(`${name}ColorPicker`);
        const text = document.getElementById(`${name}Color`);
        if (picker && text) {
            picker.addEventListener("input", () => text.value = picker.value);
            text.addEventListener("input", () => picker.value = text.value);
        }
    });

    function renderReviewSummary() {
        const container = document.getElementById("reviewContainer");
        const formData = new FormData(form);
        const company = formData.get("companyName") || "—";
        const contact = formData.get("contactPerson") || "—";
        const email = formData.get("email") || "—";
        const mobile = formData.get("mobile") || "—";
        const modules = formData.getAll("modules").join(", ") || "None selected";

        container.innerHTML = `
            <div class="client-review-card">
                <h4>Contact Details</h4>
                <div class="client-review-line"><span>Company</span><span>${company}</span></div>
                <div class="client-review-line"><span>Contact</span><span>${contact}</span></div>
                <div class="client-review-line"><span>Email</span><span>${email}</span></div>
                <div class="client-review-line"><span>Mobile</span><span>${mobile}</span></div>
            </div>
            <div class="client-review-card">
                <h4>Selected Modules</h4>
                <div class="client-review-line"><span>Modules</span><span>${modules}</span></div>
            </div>
        `;
    }

    updateStep(0);
});

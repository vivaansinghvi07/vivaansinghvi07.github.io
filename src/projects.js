document.addEventListener("DOMContentLoaded", () => {
    const projectModal = document.getElementById('project-modal');
    const courseworkModal = document.getElementById('coursework-modal');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    const projectCards = document.querySelectorAll('.project-card');
    const courseworkTriggers = document.querySelectorAll('.coursework-trigger');

    const courseworkData = {
    1: {
        title: 'Select Coursework',
        courses: [
            { name: 'EECS 370: Introduction to Computer Organization', description: 'Studied how computers work at a low level, learning ARM assembly and how to build a pipelined processor for a custom ISA. Also studied caches and virtual memory.' },
            { name: 'EECS 376: Foundations of Computer Science', description: 'Developed a theoretical foundation of computer science through algorithm analysis, time complexity, Turing Machines, P vs NP, and basic cryptography.' },
            { name: 'EECS 482: Operating Systems', description: 'Covered operating systems fundamentals, such as abstraction, concurrency, memory management, and networking. Built a thread library, virtual memory pager, and a concurrent network fileserver.' },
            { name: 'EECS 471: GPU Programming', description: 'Learned about CUDA programming and best practices through a variety of parallel algorithms, such as matrix multiplication, reduction, convolution, histogramming, and scanning.' },
            { name: 'EECS 445: Machine Learning', description: 'Studied machine learning fundamentals, from logistic regression and decision trees to deep generative models like diffusion.' },
            { name: 'EECS 498: Foundations of Language Models', description: 'Examined every part of modern large language models, covering tokenization, attention, transformers, training, fine-tuning, reinforcement learning, test-time scaling, LLM capabilities, and alternative architectures.'},
            { name: 'EECS 479: Quantum Computing (planned)', description: 'Will develop understanding of quantum computing and its applications, as well as going over classical algorithms such as Shor\'s, Grover\'s, and the Deutsch-Jozaa, as well as error correction codes.' },
            { name: 'EECS 498: Computer Graphics and Generative Models (planned)', description: 'Will cover 3D rendering techniques like rasterization and ray-tracing, then will cover generative modeling such as NeRFs or Gaussian Splatting.'},
            { name: 'EECS 498: Capstone: Automated Programming (planned)', description: 'Will study the field of program synthesis, covering traditional methods as well as more modern neuro-symbolic approaches. Course will contain a semester-long capstone project.'},
        ]
    }
    };

    const projectData = {
    1: {
        title: 'Physical Adversarial Patch Attack',
        description: 'Utilizes modern 3D reconstruction techniques such as 2D Gaussian Splatting and neural mesh parameterization to create a high-fidelity, editable 3D model of any target object. Then, runs a PyTorch attack algorithm to optimize adversarial patches against YOLO models, which can be printed out in real life. Work done during an internship at ORNL and submitted to SPIE Conference on Assurance and Security of AI Systems.',
        image: 'assets/images/adv_patch.png'
    },
    2: {
        title: 'Bluetooth Wearable Mouse',
        description: 'Uses a XIAO nRF52840 microcontroller connected to LSM6DS3TR-C, LSM6DSV16X, and BMI270 IMUs to provide 6 degrees of freedom of user motion. Connects to hosts via Bluetooth to enable freedom of movement, and currently supports mouse motion, left/middle/right clicking, scrolling, tab switching, and pausing. Image shows a rough functional prototype of the design, with future plans to create a custom PCB and accessory. In the process of integrating machine learning for more accurate gesture classification, as well as live handwriting recognition.',
        image: 'assets/images/mouse.jpg'
    },
    3: {
        title: 'Rubik\'s Cube Solver',
        description: 'Uses WebSockets to connect a user\'s webcam to a simple central server, applying custom-built computer vision algorithms to read a Rubik\'s cube from the single video stream. After responding with the parsed cube, allows the user to correct any errors made by the algorithm. Finally, solves the cube using efficient NumPy-based cube manipulation and sends step-by-step moves back to the user.',
        image: 'assets/images/rubix-cube-solver.png'
    },
    4: {
        title: 'Phylogenetic Reconstruction Optimization',
        description: 'Applies optimization techniques like smarter algorithm design and caching to improve time complexity, or better data structures and a C++ port to improve baseline performance. On a dataset of 1 billion digital organisms, reconstructs a phylogeny in under 3 hours total. Image compares phylogenies from the algorithm to the ground truth to demonstrate accuracy.  Work done during a research assistantship and published in ALife 2025.',
        image: 'assets/images/phylo.png'
    },
    5: {
        title: 'High-Pass Spectral Adversarial Defense',
        description: 'Uses frequency domain transformations and a trained VGG-16 CNN to detect adversarial images against classification models. Rigorously benchmarked with similar prior approaches, proving a detection rate of over 99% on basic adversarial images. Additionally developed a new, imperceptible adversarial attack. Work done during an internship at Oak Ridge National Laboratory.',
        image: 'assets/images/hsad.png'
    },
    6: {
        title: 'Bim',
        description: 'Written in pure C, supporting a wide variety of editing features such as advanced navigation, multiple buffers, syntax highlighting, screensavers, and file browsing.',
        image: 'assets/images/bim.png'
    },
    7: {
        title: 'High-Throughput Leaf Processing Pipeline',
        description: 'Integrates classical computer vision techniques with modern machine learning methods (namely, OCR with PaddleOCR and segmentation with SAM) to complete a series of tasks on a dataset of leaf images. Tasks included OCR with printed labels, phenotyping, environment inference, and location approximation. Won the best paper award for the SMC Data Challenge 2023.',
        image: 'assets/images/smc.png'
    },
    8: {
        title: 'CUDA Convolution Optimization',
        description: 'A novel matrix multiplication-based algorithm for 2D convolution, highly suitable for parallelism on GPUs while avoiding data unrolling as done in traditional GEMM methods. Benchmarking is in progress, but results suggest the algorithm outperforms current PyTorch implementations in some scenarios. Work done for a final project in EECS 471: Applied Parallel Programming with GPUs.',
        image: 'assets/images/cudaconv.png'
    },
    9: {
        title: 'LLM Interpretability',
        description: 'Replicates the paper "Identifying Functionally Important Features with End-to-End Sparse Dictionary Learning" by replacing one of the layers of GPT-2 with a Sparse Autoencoder, and studies the paper in a novel setting. Work done for a final project in EECS 498: Foundations of Language Models. Image taken from original paper.',
        image: 'assets/images/llm.png'
    },
    };

    projectCards.forEach(card => {
    card.addEventListener('click', () => {
        const projectId = card.getAttribute('data-project');
        const project = projectData[projectId];
        
        document.getElementById('modal-title').textContent = project.title;
        document.getElementById('modal-body').innerHTML = `<p>${project.description}</p>`;
        
        const modalImage = document.getElementById('modal-image');
        if (project.image) {
            modalImage.style.backgroundImage = `url('${project.image}')`;
            modalImage.textContent = '';
        } else {
            modalImage.style.backgroundImage = 'none';
            modalImage.textContent = 'Image coming soon';
        }
        
        projectModal.classList.add('active');
    });
    });

    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            projectModal.classList.remove('active');
            courseworkModal.classList.remove('active');
        });
    });

    courseworkTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const courseworkId = trigger.getAttribute('data-coursework');
            const coursework = courseworkData[courseworkId];
            
            if (!coursework) {
                console.error('Coursework data not found for ID:', courseworkId);
                return;
            }
            
            document.getElementById('coursework-title').textContent = coursework.title;
            
            const courseworkBody = document.getElementById('coursework-body');
            if (coursework.courses && coursework.courses.length > 0) {
                let coursesHTML = '<ul>';
                coursework.courses.forEach(course => {
                    coursesHTML += `<li><strong>${course.name}:</strong> ${course.description}</li>`;
                });
                coursesHTML += '</ul>';
                courseworkBody.innerHTML = coursesHTML;
            } else {
                courseworkBody.innerHTML = '<p>Course information coming soon.</p>';
            }
            
            courseworkModal.classList.add('active');
        });
    });

    window.addEventListener('click', (event) => {
    if (event.target === projectModal) {
        projectModal.classList.remove('active');
    }
    if (event.target === courseworkModal) {
        courseworkModal.classList.remove('active');
    }
    });

    document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        projectModal.classList.remove('active');
        courseworkModal.classList.remove('active');
    }
    });
});

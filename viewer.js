import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { PLYLoader } from 'three/addons/loaders/PLYLoader.js';

class GaussianSplattingViewer {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        this.splatMesh = null;
        this.autoRotate = false;
        this.animationId = null;
        this.initialCameraDistance = 5;
        
        this.init();
    }
    
    init() {
        // Get canvas element
        const canvas = document.getElementById('viewer-canvas');
        if (!canvas) {
            console.error('Canvas element not found');
            return;
        }
        
        // Create scene
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x000000);
        
        // Create camera
        const aspect = window.innerWidth / window.innerHeight;
        this.camera = new THREE.PerspectiveCamera(60, aspect, 0.1, 1000);
        this.camera.position.set(0, 0, this.initialCameraDistance);
        
        // Create renderer
        this.renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: true,
            alpha: false,
            powerPreference: 'high-performance'
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        
        // Add controls
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.minDistance = 0.5;
        this.controls.maxDistance = 100;
        this.controls.autoRotate = false;
        this.controls.enablePan = true;
        
        // Add lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
        this.scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight.position.set(5, 5, 5);
        this.scene.add(directionalLight);
        
        // Handle window resize
        window.addEventListener('resize', () => this.onWindowResize());
        
        // Setup UI controls
        this.setupControls();
        
        // Load the 3DGS file
        this.loadSplatFile();
        
        // Start animation loop
        this.animate();
    }
    
    setupControls() {
        const resetBtn = document.getElementById('reset-camera');
        const autoRotateBtn = document.getElementById('toggle-auto-rotate');
        
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                this.resetCamera();
            });
        }
        
        if (autoRotateBtn) {
            autoRotateBtn.addEventListener('click', () => {
                this.autoRotate = !this.autoRotate;
                this.controls.autoRotate = this.autoRotate;
                autoRotateBtn.textContent = this.autoRotate ? 'Stop Rotate' : 'Auto Rotate';
            });
        }
    }
    
    resetCamera() {
        if (this.splatMesh) {
            // Reset to fit the model
            const box = new THREE.Box3().setFromObject(this.splatMesh);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());
            const maxDim = Math.max(size.x, size.y, size.z);
            
            this.camera.position.set(0, 0, maxDim * 1.5);
            this.controls.target.copy(center);
        } else {
            this.camera.position.set(0, 0, this.initialCameraDistance);
            this.controls.target.set(0, 0, 0);
        }
        this.controls.update();
    }
    
    async loadSplatFile() {
        const loadingScreen = document.getElementById('loading-screen');
        
        try {
            // Try to load from URL parameter or default file
            const urlParams = new URLSearchParams(window.location.search);
            let filePath = urlParams.get('file');
            
            // If no file specified, try common locations
            if (!filePath) {
                // Try root directory first
                filePath = 'gs_VIVERSE_CampTaylor_LowRop.compressed.ply';
            }
            
            console.log('Loading 3DGS file:', filePath);
            
            // Load PLY file (3DGS files are often in PLY format)
            const loader = new PLYLoader();
            
            loader.load(
                filePath,
                (geometry) => {
                    console.log('PLY file loaded successfully', geometry);
                    
                    // Ensure geometry has colors
                    if (!geometry.hasAttribute('color')) {
                        // Add default white color
                        const colors = new Float32Array(geometry.attributes.position.count * 3);
                        colors.fill(1.0);
                        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
                    }
                    
                    // Create material optimized for point clouds
                    const material = new THREE.PointsMaterial({
                        size: 0.02,
                        vertexColors: true,
                        sizeAttenuation: true,
                        transparent: false,
                        opacity: 1.0
                    });
                    
                    // Create points mesh
                    this.splatMesh = new THREE.Points(geometry, material);
                    this.scene.add(this.splatMesh);
                    
                    // Center and scale the model
                    geometry.computeBoundingBox();
                    const box = geometry.boundingBox;
                    const center = box.getCenter(new THREE.Vector3());
                    const size = box.getSize(new THREE.Vector3());
                    const maxDim = Math.max(size.x, size.y, size.z);
                    
                    // Scale to fit in view
                    const scale = 2 / maxDim;
                    this.splatMesh.scale.multiplyScalar(scale);
                    this.splatMesh.position.sub(center.multiplyScalar(scale));
                    
                    // Adjust camera to view the model
                    const distance = maxDim * 1.5;
                    this.camera.position.set(0, 0, distance);
                    this.controls.target.set(0, 0, 0);
                    this.controls.update();
                    
                    // Hide loading screen
                    if (loadingScreen) {
                        loadingScreen.style.display = 'none';
                    }
                    
                    console.log('Model loaded and centered successfully');
                },
                (progress) => {
                    if (progress.lengthComputable) {
                        const percentComplete = (progress.loaded / progress.total) * 100;
                        console.log('Loading progress:', percentComplete.toFixed(2) + '%');
                    }
                },
                (error) => {
                    console.error('Error loading PLY file:', error);
                    this.showError(`Failed to load 3DGS file: ${filePath}<br><br>Error: ${error.message || 'File not found or invalid format'}<br><br>Make sure the file exists and is accessible.`);
                    if (loadingScreen) {
                        loadingScreen.style.display = 'none';
                    }
                }
            );
        } catch (error) {
            console.error('Error in loadSplatFile:', error);
            this.showError('Error loading 3DGS file: ' + error.message);
            if (loadingScreen) {
                loadingScreen.style.display = 'none';
            }
        }
    }
    
    showError(message) {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.innerHTML = `
                <div class="loader">
                    <p style="color: #ff4444; margin-bottom: 15px;">${message}</p>
                    <p style="color: #888; font-size: 14px; line-height: 1.6;">
                        <strong>Note:</strong> This viewer loads PLY point cloud files.<br>
                        For full 3D Gaussian Splatting rendering with proper splat visualization,<br>
                        you may need to integrate specialized libraries like gaussian-splatting-web.
                    </p>
                    <p style="color: #666; font-size: 12px; margin-top: 15px;">
                        Check the browser console for more details.
                    </p>
                </div>
            `;
        }
    }
    
    onWindowResize() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        
        this.renderer.setSize(width, height);
    }
    
    animate() {
        this.animationId = requestAnimationFrame(() => this.animate());
        
        if (this.controls) {
            this.controls.update();
        }
        
        if (this.renderer && this.scene && this.camera) {
            this.renderer.render(this.scene, this.camera);
        }
    }
    
    dispose() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        
        if (this.controls) {
            this.controls.dispose();
        }
        
        if (this.renderer) {
            this.renderer.dispose();
        }
    }
}

// Initialize viewer when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new GaussianSplattingViewer();
    });
} else {
    new GaussianSplattingViewer();
}


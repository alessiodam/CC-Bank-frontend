<template>
    <nav class="navbar">
        <div class="navbar-brand">
            <NuxtLink to="/" class="navbar-item">
                <span class="brand-name">Bank Of ComputerCraft</span>
            </NuxtLink>
        </div>

        <div class="navbar-menu">
            <NuxtLink to="/login" class="navbar-item">Login</NuxtLink>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'Navbar',
    mounted() {
        this.adjustMainContentPadding();
        window.addEventListener('resize', this.adjustMainContentPadding);
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.adjustMainContentPadding);
    },
    methods: {
        adjustMainContentPadding() {
            const navbarHeight = this.$el.offsetHeight;
            const mainContent = document.querySelector('.main-content');
            if (mainContent) {
                mainContent.style.paddingTop = navbarHeight + 'px';
            }
        }
    }
}
</script>

<style scoped>
.navbar {
    background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(30,30,100,1) 41%, rgba(11,64,74,1) 100%);
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
}

.navbar-brand {
    display: flex;
    align-items: center;
}

.brand-name {
    color: #fff;
    font-size: 1.25rem;
    font-weight: bold;
}

.navbar-item {
    color: #fff;
    text-decoration: none;
    padding: 0.5rem 1rem;
    transition: background-color 0.3s ease;
}

.navbar-item:hover {
    background-color: #555;
}

.navbar-menu {
    display: flex;
    gap: 1rem;
}

@media (max-width: 768px) {
    .navbar-menu {
        flex-direction: column;
        align-items: flex-start;
    }
    
    .navbar-menu .navbar-item {
        margin-top: 0.5rem;
    }
}

.navbar-item.nuxt-link-active {
    background-color: #333;
}
</style>

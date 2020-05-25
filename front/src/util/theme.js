export default {
    palette: {
        primary: {
            light: '#0d1d25',
            main: '#132a35',
            dark: '#42545d',
            contrastText: '#fff'
        },
        secondary: {
            light: '#f3833d',
            main: '#f0650d',
            dark: '#a84609',
            contrastText: '#fff'
        },
    },

    content: {
        typography: {
            useNextVariants: true
        },

        container: {
            margin: '60px auto 0 auto',
            padding: 20,
            maxWidth: 1200,
            minHeight: 'calc(100vh - 80px)',
        },

        spinnerDiv: {
            textAlign: 'center',
        },

        form: {
            textAlign: 'center'
        },

        pageTitle: {
            margin: '10px auto 10px auto',
        },

        imageLogo: {
            margin: '20px auto 20px auto',
            width: '64px',
        },

        textField: {
            margin: '10px auto 10px auto',
        },

        button: {
            marginTop: 20,
            position: 'relative',
        },

        customError: {
            color: 'red',
            fontSize: '0.8rem',
            marginTop: 10
        },

        progress: {
            position: 'absolute',
        },

        card: {
            display: 'flex',
            marginBottom: 20,
            position: 'relative'
        },

        content: {
            padding: 25,
            objectFit: 'cover'
        },

        image: {
            minWidth: 150,
            backgroundSize: 'contain',
            backgroundPosition: 'left',
        },

        editInfoForm: {
            margin: '0 20px 20px 20px',
        },

        editInfoButtons: {
            textAlign: 'right',
            paddingBottom: 10,
            paddingRight: 12,
        },

        editIcon: {
            float: 'right',
        },

        invisibleSeparator: {
            border: 'none',
            margin: 4,
        },

        visibleSeparator: {
            width:'100%',
            borderBottom: '1px solid rgba(0,0,0,0.1)',
            marginBottom: 20
        },

        paper: {
            padding: 20,
            position: "sticky",
            top: "80px",
            alignSelf: "flex-start",
        },

        profile: {
            '& .image-wrapper': {
                textAlign: 'center',
                position: 'relative',
            },
            '& .profile-image': {
                width: 200,
                height: 200,
                objectFit: 'cover',
                maxWidth: '100%',
                borderRadius: '50%',
            },
            '& .profile-details': {
                textAlign: 'center',
                '& span, svg': {
                    verticalAlign: 'middle'
                },
                '& a': {
                    color: '#132a35',
                }
            },
            '& hr': {
                border: 'none',
                margin: '0 0 10px 0'
            },
        },
    }
}
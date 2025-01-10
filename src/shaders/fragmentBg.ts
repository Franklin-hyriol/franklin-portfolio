export const fragmentShader = /*glsl*/ `

    /* color palette:
    76, 149, 156
    33, 96, 198
    85, 184, 130
    74, 160, 115
    47, 112, 168
    */
    // #extension GL_OES_standard_derivatives : enable

    #ifdef GL_ES
    precision mediump float;
    #endif
 

    uniform float u_time;
    uniform vec2 u_resolution;
    uniform vec2 u_mouse;

    #define iResolution u_resolution
    #define fragCoord gl_FragCoord
    #define fragColor gl_FragColor
    #define mainImage main
    #define iTime u_time

    #define power 10.0
    #define zoomOut 5.0
    #define rot 1.0
    #define iter 8.0
    #define huePower 5.0
    #define glow 0.1
    #define distortScale 0.3
    #define distortPower 1.0
    #define Speed 0.01
    #define WaveSpeed 0.1
    #define Brightness 0.02

    void mainImage( void )
    {
        // Normalized pixel coordinates (from 0 to 1)
        vec2 uv = ( fragCoord.xy / iResolution.xy);
        vec2 mouse = u_mouse.xy / iResolution.xy;

        vec2 XYScale = vec2(1.,1.);
        vec2 XYMove = vec2(0.0,0.0);


        uv *= zoomOut;
        uv.xy = uv.xy * XYScale;
        uv.xy = uv.xy + XYMove;
        vec3 finalCol = vec3(0,0,0);
        float halfDistort = distortScale / 0.5;
        float distortsc2 = distortScale / distortScale + halfDistort;
        
        for(float i = 1.0; i < iter; i++){
            uv.x += distortPower / i * sin(i * distortScale * uv.y - iTime * Speed);
            uv.y += distortPower / i * sin(i * distortsc2 * uv.x + iTime * Speed);
        }
        vec3 col = vec3(vec3(glow,glow,glow)/sin(iTime*WaveSpeed-length(uv.yx) - uv.y));
        finalCol = vec3(col*col);


        vec3 Color = vec3(0., mouse.y,  mouse.x) * mouse.x * Brightness;

        // Output to screen
        fragColor = vec4(finalCol.rgb * Color, 1) * power;
    }
    
`;
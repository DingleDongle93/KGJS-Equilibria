import { describe, it, expect, beforeEach } from 'vitest';
import { KineticGraph } from '../ts/kg';

describe('Snapshot Tests', () => {
    let container: HTMLElement;

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
    });

    it('matches exact SVG output for basic line graph', () => {
        const config = {
            aspectRatio: 2,
            scales: [
                { name: 'x', domainMin: 0, domainMax: 10 },
                { name: 'y', domainMin: 0, domainMax: 10 }
            ],
            layers: [
                [],
                [
                    {
                        type: 'Curve',
                        def: {
                            univariateFunction: {
                                fn: "2*x",
                                ind: "x"
                            },
                            xScaleName: 'x',
                            yScaleName: 'y',
                            stroke: "blue",
                            strokeWidth: 2
                        }
                    }
                ],
                [],
                []
            ]
        };

        const kg = new KineticGraph(config);
        kg.mount(container);

        // Let's just test that the SVG exists and curve is rendered
        const svg = container.querySelector('svg');
        expect(svg).not.toBeNull();

        const path = svg?.querySelector('path');
        expect(path).not.toBeNull();

        // Take an explicit snapshot string
        expect(container.innerHTML).toMatchSnapshot();

        kg.destroy();
    });
});

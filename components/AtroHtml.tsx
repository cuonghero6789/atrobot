import spacing from "@/styles/spacing";
import TypeStyles from "@/styles/TypeStyle";
import React from "react"
import HTMLView from 'react-native-htmlview';
import { Colors } from "react-native/Libraries/NewAppScreen";

interface Props {
    desc: string;
}

const AtroHtml = ({ desc }: Props) => {
    return <HTMLView
        value={`<p>${desc}</p>`}
        stylesheet={{
            p: {
                ...TypeStyles.bodyText,
                color: Colors.white,
                marginTop: spacing.margin.large,
            }
        }}
    />
}
export default AtroHtml;